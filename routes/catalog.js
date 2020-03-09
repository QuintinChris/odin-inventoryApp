var express = require('express');
var router = express.Router();

var shoe_controller = require('../controllers/shoeController');
var brand_controller = require('../controllers/brandController');
var shoe_instance_controller = require('../controllers/shoeInstanceController');


router.get('/', shoe_controller.index);

// Get for single shoe
router.get('/shoe/:id', shoe_controller.shoe_detail);

// Get shoe_list
router.get('/shoes', shoe_controller.shoe_list);

// Get create_shoe

// post create_shoe

// get and post brand

// get and post


// display list of all shoes

// display shoe detail page

// display shoe create form (if member?)

// handle shoe create on POST (if member?)

    // this is where you would perform validation/sanitization

// shoe delete get/post (if admin)

// shoe update get/post (if admin)

module.exports = router;