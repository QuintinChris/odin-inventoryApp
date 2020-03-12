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
        res.render('brand', {title: 'Brand Detail', logo: results.brand.logo,brand: results.brand, beand_shoes: results.brand_shoes})
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

// Display create brand on GET
exports.create_brand_get = function(req, res, next) {
    res.render('create_brand', { title: 'Create brand' });
};

// Handle create_brand on POST
exports.create_brand_post = [
    // Validate fields
    body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('logo', 'The brand should have a logo.').isLength({ min: 1 }).trim(),
    body('desc', 'Please say something about the brand.').isLength({ min: 1 }).trim(),

    // Sanitize fields
    sanitizeBody('*').escape(),

    // Process request after validating and sanitizing
    (req, res, next) => {

        // Extract validation errors from req
        const errors = validationResult(req);

        // Create brand with escaped / trimmed data
        var brand = new Brand(
            { name: req.body.name,
              logo: req.body.logo,
              desc: req.body.desc
            });

        if (!errors.isEmpty()){
            // if there are errors, render form again w sanitized data
            res.render('create_brand', { title: 'Create brand', brand: brand, errors: errors.array() });
            return;
        }
        else {
            // Data is valid so save brand
            brand.save(function(err) {
                if (err) { return next(err); }
                res.redirect(brand.url);
            })
        }
    }
];

// Display delete_brand on GET
exports.delete_brand_get = function(req, res, next) {
    async.parallel({
        brand: function(callback) {
            Brand.findById(req.params.id).exec(callback)
        },
        brand_shoes: function(callback) {
            Shoe.find({'brand': req.params.id }).exec(callback)
        },
    }, function(err, results) {
        // Error
        if (err) {return next(err)}
        if (results.brand==null) {
            res.redirect('/catalog/authors');
        }
        // Success
        res.render('delete_brand', { title: 'Delete brand', brand: results.brand, brand_shoes: results.brands_shoes });
    });
};

// Handle delete_brand on POST
exports.delete_brand_post = function(req, res, next) {
    async.parallel({
        brand: function(callback) {
            Brand.findById(req.params.id).exec(callback)
        },
        brand_shoes: function(callback) {
            Shoe.find({'brand': req.params.id }).exec(callback)
        },
    }, function(err, results) {
        // Error
        if (err) {return next(err)}
        // Success
        if (results.brand_shoes.length > 0) {
            // brand has shoes
            res.render('delete_brand', { title: 'Delete brand', brand: results.brand, brand_shoes: results.brands_shoes });
            return;
        }
        else {
            Brand.findByIdAndRemove(req.body.brandid, function deleteBrand(err) {
                if (err) { return next(err); }
                res.redirect('/catalog/brands');
            })
        }
    });
};

// Display update_brand on GET
exports.update_brand_get = function(req, res, next) {
    Brand.findById(req.params.id, function(err, brand) {
        // Errors
        if (err) { return next(err); }
        if (brand == null) {
            var err = new Error('Brand not found');
            err.status = 404;
            return next(err);
        }
        // Success
        res.render('update_brand', { title: 'Edit Brand', brand: brand });
    });
};

// Handle shoe edit on POST
exports.update_brand_post = [
    // Validate fields
    body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('logo', 'The brand should have a logo.').isLength({ min: 1 }).trim(),
    body('desc', 'Please say something about the brand.').isLength({ min: 1 }).trim(),

    // Sanitize fields
    sanitizeBody('*').escape(),

    // Process request after validating and sanitizing
    (req, res, next) => {

        // Extract validation errors from req
        const errors = validationResult(req);

        // Create brand with escaped / trimmed data
        var brand = new Brand(
            { name: req.body.name,
              logo: req.body.logo,
              desc: req.body.desc,
              _id: req.params.id
            });

        if (!errors.isEmpty()){
            // if there are errors, render form again w sanitized data
            res.render('update_brand', { title: 'Edit brand', brand: brand, errors: errors.array() });
            return;
        }
        else {
            // Data is valid so update brand
            Brand.findByIdAndUpdate(req.params.id, brand, {}, function(err, thebrand) {
                if (err) { return next(err) }
                res.redirect(thebrand.url);
            });
        }
    }
];