var Brand = require('../models/brand');
var Shoe = require('../models/shoe');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Function to pass data for individual brand to view
exports.brand_detail = function(req, res, next) {
    async.parallel({
        brand: function(callback) {
            Brand.findById(req.params.id).exec(callback)
        },
        brand_shoes: function(callback) {
            Shoe.find({'brand': req.params.id}, 'name image').exec(callback)
        },
    }, function(err, results) {
        // Error with API
        if (err) {return next(err)}
        // No results
        if (results.brand==null) {
            var err = new Error('Brand not found');
            err.status = 404;
            return next(err);
        }
        // Success
        res.render('brand_detail', {title: 'Brand Detail', logo: results.brand.logo,brand: results.brand, beand_shoes: results.brand_shoes})
    });
};

// Function to pass list of brands to view
exports.brand_list = function(req, res, next) {
    Brand.find().populate('brand').sort([['name', 'ascending']])
         .exec(function (err, list_brands) {
             if (err) { return next(err); }
             res.render('brand_list', { title: 'Brand List', brand_list: list_brands });
         });
};


// FIX EVERYTHING BELOW THIS LINE

// Display create brand on GET
exports.create_brand_get = function(req, res, next) {
    async.parallel({
        brands: function(callback) {
            Brand.find(callback);
        },
     }, function(err, results) {
            if (err) { return next(err); }
            res.render('create_shoe', { title: 'Create Shoe', brands: results.brands });
    });
};

// Handle shoe create on POST
exports.create_brand_post = function(req, res, next) [
    // Validate fields
    body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('brand', 'A brand must be selected.').isLength({ min: 1 }).trim(),
    body('desc', 'Every pair has a story, please say something about the shoe.').isLength({ min: 1 }).trim(),
    //body('image', 'The shoe must have an image.').isLength({ min: 1 }).trim(),

    // Sanitize fields
    sanitizeBody('*').escape(),

    // Process request after validating and sanitizing
    (req, res, next) => {

        // Extract validation errors from req
        const errors = validationResult(req);

        // Create shoe with escaped / trimmed data
        var shoe = new SourceBuffer(
            { name: req.body.name,
              brand: req.body.brand,
              image: req.body.image,
              desc: req.body.desc
            });

        if (!errors.isEmpty()){
            // if there are errors, render form again w sanitized data

            // Get all authors and genres for form
            async.parallel({
                brands: function(callback) {
                    Brand.find(callback);
                },
             }, function(err, results) {
                if (err) { return next(err); }
                res.render('create_shoe', { title: 'Create shoe', brands: results.brand });
            });
            return;
        }
        else {
            // Data is valid so save shoe
            shoe.save(function(err) {
                if (err) { return next(err); }
                res.redirect(shoe.url);
            })
        }
    }
];

// Display delete_shoe on GET
exports.delete_brand_post = function(req, res, next) {
    async.parallel({
        shoe: function(callback) {
            Shoe.findById(req.params.id).populate('brand').exec(callback);
        },
        shoe_shoeinstances: function(callback) {
            ShoeInstance.find({ 'shoe': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if(err) {return next(err);}
        if (results.shoe==null) {
            res.redirect('catalog/shoes');
        }
        res.render('delete_shoe', { title: 'Delete Shoe', shoe: results.shoe, shoe_instances: results.shoe_shoeinstances })
    });
};

// Handle delete_shoe on POST
exports.delete_brand_get = function(req, res, next) {
    async.parallel({
        shoe: function(callback) {
            Shoe.findById(req.params.id).populate('brand').exec(callback);
        },
        shoe_shoeinstances: function(callback) {
            ShoeInstance.find({ 'shoe': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if(err) {return next(err);}
        if (results.shoe_shoeinstances.length > 0) {
            // Shoe has shoe_instances
            res.render('delete_shoe', { title: 'Delete Shoe', shoe: results.shoe, shoe_instances: results.shoe_shoeinstances });
            return;
        }
        else {
            // Shoe has no shoe_instances
            Shoe.findByIdAndRemove(req.body.id, function deleteShoe(err) {
                if (err) { return next(err); }
                // success - go to shoe list
                res.redirect('/catalog/shoes');
            });
        }
    });
};


// Get edit_shoe on GET
exports.update_brand_get = function(req, res, next) {
    async.parallel({
        shoe: function(callback) {
            Shoe.findById(req.params.id).populate('brand').exec(callback);
        },
        brands: function(callback) {
            Brand.find(callback);
        },
     }, function(err, results) {
            if (err) { return next(err); }
            if (results.shoe==null) {
                var err = new Error('Shoe not found');
                err.status = 404;
                return next(err);
            }
            res.render('update_shoe', { title: 'Edit Shoe', shoe: results.shoe, brands: results.brands });
    });
};

// Handle shoe edit on POST
exports.update_brand_post = function(req, res, next) [
    // Validate fields
    body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('brand', 'A brand must be selected.').isLength({ min: 1 }).trim(),
    body('desc', 'Every pair has a story, please say something about the shoe.').isLength({ min: 1 }).trim(),
    //body('image', 'The shoe must have an image.').isLength({ min: 1 }).trim(),

    // Sanitize fields
    sanitizeBody('*').escape(),

    // Process request after validating and sanitizing
    (req, res, next) => {

        // Extract validation errors from req
        const errors = validationResult(req);

        // Create shoe with escaped / trimmed data
        var shoe = new SourceBuffer(
            { name: req.body.name,
              brand: req.body.brand,
              image: req.body.image,
              desc: req.body.desc
            });

        if (!errors.isEmpty()){
            // if there are errors, render form again w sanitized data

            // Get all authors for form
            async.parallel({
                brands: function(callback) {
                    Brand.find(callback);
                },
             }, function(err, results) {
                if (err) { return next(err); }
                res.render('update_shoe', { title: 'Edit shoe', brands: results.brand });
            });
            return;
        }
        else {
            // Data is valid so save shoe
            Shoe.findByIdAndUpdate(req.params.id, shoe, {}, function(err, theshoe) {
                if (err) { return next(err); }
                res.redirect(theshoe.url);
            })
        }
    }
];