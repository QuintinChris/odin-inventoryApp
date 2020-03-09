var Brand = require('../models/brand');
var Shoe = require('../models/shoe');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// display list of all brands

// display brand detail page

// display brand create form (if member?)

// handle brand create on POST (if member?)

    // this is where you would perform validation/sanitization

// brand delete get/post (if admin)

// brand update get/post (if admin)