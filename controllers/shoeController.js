var Shoe = require('../models/shoe');
var Brand = require('../models/brand');
var async = require('async');
var ShoeInstance = require('../models/shoeInstance');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function (req, res) {
    res.render('index', {title: 'Shoe Inventory Home'});
};

// Display list of shoes
exports.shoe_list = function (req, res, next) {
    Shoe.find({}, 'name brand image').populate('brand').populate('image').exec(function (err, list_shoes) {
        if (err) {return next(err)}
        else {
            res.render('shoe_list', { title: 'Shoe List', shoe_list: list_shoes })
        }
    });
};

// Display info on specific shoe
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


// Display create shoe on GET
exports.shoe_create_get = function(req, res, next) {
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
exports.shoe_create_post = function(req, res, next) [
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
exports.book_delete_get = function(req, res, next) {
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
exports.book_delete_post = function(req, res, next) {
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
exports.update_shoe_get = function(req, res, next) {
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
exports.update_shoe_post = function(req, res, next) [
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