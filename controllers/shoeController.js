var Shoe = require('../models/shoe');
var Brand = require('../models/brand');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// display list of all shoes

// display shoe detail page

// display shoe create form (if member?)

// handle shoe create on POST (if member?)

    // this is where you would perform validation/sanitization

// shoe delete get/post (if admin)

// shoe update get/post (if admin)