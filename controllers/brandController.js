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



// this is where you would perform validation/sanitization