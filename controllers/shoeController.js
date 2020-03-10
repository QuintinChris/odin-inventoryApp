var Shoe = require('../models/shoe');
var Brand = require('../models/brand');
var async = require('async');
var ShoeInstance = require('../models/shoeInstance');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
    //res.render('index', {title: 'Shoe Inventory Home'});
};

exports.shoe_list = function (req, res, next) {
    Shoe.find({}, 'name brand image').populate('brand').populate('image').exec(function (err, list_shoes) {
        if (err) {return next(err)}
        else {
            res.render('shoe_list', { title: 'Shoe List', shoe_list: list_shoes })
        }
    });
};

exports.shoe_detail = function(req, res, next) {
    async.parallel({
        shoe: function(callback) {
            Shoe.findById(req.params.id)
                .populate('brand')
                .exec(callback);
        },
        shoe_instance: function(callback) {
            ShoeInstance.find({ 'shoe': req.params.id })
                .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.shoe==null) {
            var err = new Error('Shoe not found');
            err.status = 404;
            return next(err);
        }
        res.render('shoe_detail', {title: 'Shoe Detail', image: 'Shoe Image', shoe: results.shoe, shoe_instances: results.shoe_instance } );
    });
};


// Admin Methods:
// Create_shoe
// Delete_shoe
// Edit_shoe
// this is where you would perform validation/sanitization