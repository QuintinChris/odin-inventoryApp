#! /usr/bin/env node

console.log('This script populates some test shoes, brands, images, and shoeinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Shoe = require('./models/shoe');
var Brand = require('./models/brand');
//var Image = require('./models/images')
var ShoeInstance = require('./models/shoeinstance');

var images = require('../inventoryApp/images');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var brands = [];
var images = [];
var shoes = [];
var shoeinstances = [];
var jordans = [];
var nikes = [];
var converses = [];
var reeboks = [];
var myadidas = [];

function brandCreate(name, logo, desc, shoes) {
  brandDetail = {name:name}
  
  var brand = new Brand(brandDetail);
       
  brand.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Brand: ' + brand);
    brands.push(brand)
    cb(null, brand)
  }  );
}

// prob wont create images here
function imageCreate(shoe, url) {
  var image = new Image({ shoe: shoe });
       
  image.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}

function shoeCreate(name, image, brand, inStock) {
  shoeDetail = { 
    name: name,
    image: images.image,
    brand: brand,
    inStock: inStock
  }
  if (image != false) shoedetail.image = image
    
  var shoe = new Shoe(shoedetail);    
  shoe.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Shoe: ' + shoe);
    shoes.push(shoe)
    cb(null, shoe)
  }  );
}


function shoeInstanceCreate(shoe, desc, brand) {
  shoeinstancedetail = { 
    shoe: shoe,
    brand: brand
  }    
    
  var shoeinstance = new ShoeInstance(shoeinstancedetail);    
  shoeinstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING ShoeInstance: ' + shoeinstance);
      cb(err, null)
      return
    }
    console.log('New ShoeInstance: ' + shoeinstance);
    shoeinstances.push(shoeinstance)
    cb(null, shoe)
  }  );
}


function createBrands(cb) {
    async.series([
        function(callback) {
          brandCreate('Jordan', '' , 'Iconic design held to Legenday standard of Michael Jordan', jordans);
        },
        function(callback) {
            brandCreate('Nike', '' , 'Nike was started in ...', nikes);
        },
        function(callback) {
            brandCreate('Adidas', '' , 'Adidas is known for blah blah', myadidas);
        },
        function(callback) {
            brandCreate('Reebok', '' , 'Reebok !', reeboks);
        },
        function(callback) {
            brandCreate('Converse', '' , 'Old school swag', converses);
        }
        ],
        // optional callback
        cb);
}


function createShoes(cb) {
    async.parallel([
        function(callback) {
            shoeCreate('Kobe IX', moonwalker.jpg, Nike, true);
        },
        function(callback) {
            shoeCreate('Kobe IV', kobe-iv-la-undftd.jpg, Nike, true);
        },
        function(callback) {
            shoeCreate('Kobe I', kobe-1-protro.jpg, Nike, true);
        }
        ],
        // optional callback
        cb);
}


function createShoeInstances(cb) {
    async.parallel([
        function(callback) {
            shoeInstanceCreate(shoes[0], 'Kobe wore this shoe after recovering from a ruptured achilles suffered as a result of carrying his team in 2013', Nike);
        },
        function(callback) {
            shoeInstanceCreate(shoes[1], 'Kobe IV UNDFTD LA Kyle Kuzma', Nike);
        },
        function(callback) {
            shoeInstanceCreate(shoes[2], 'Kobe I UNDFTD Protro Pack', Nike);
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createBrands,
    createShoes,
    createShoeInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('SHOEInstances: '+shoeinstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
