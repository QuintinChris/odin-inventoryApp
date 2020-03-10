var Brand = require('../models/brand');
var Shoe = require('../models/shoe');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// this is where you would perform validation/sanitization