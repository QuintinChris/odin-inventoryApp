var express = require('express');
var router = express.Router();
var shoe_controller = require('../controllers/shoeController');
var brand_controller = require('../controllers/brandController');
var shoe_instance_controller = require('../controllers/shoeInstanceController');

// GET index
router.get('/', shoe_controller.index);

// GET for single shoe
router.get('/shoe/:id', shoe_controller.shoe_detail);

// GET shoe_list
router.get('/shoes', shoe_controller.shoe_list);

// GET for single brand
router.get('/brand/:id', brand_controller.brand_detail)

// GET / POST create_shoe (admin)

// GET/POST update_shoe (admin)

// GET/POST delete_shoe (admin)

// GET/POST create_brand (admin)

module.exports = router;