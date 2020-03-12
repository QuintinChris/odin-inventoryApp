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

// GET for brand list
router.get('/brands', brand_controller.brand_list)

// GET create_shoe 
router.get('/createshoe', shoe_controller.create_shoe_get);

// POST create_shoe
router.post('/createshoe', shoe_controller.create_shoe_post);

// GET update_shoe 
router.get('/editshoe', shoe_controller.update_shoe_get);

// POST update_shoe 
router.post('/editshoe', shoe_controller.update_shoe_post);

// GET delete_shoe 
router.get('/deleteshoe', shoe_controller.delete_shoe_get);

// POST delete_shoe
router.post('/deleteshoe', shoe_controller.delete_shoe_post);

// GET create_brand 
router.get('/createbrand', brand_controller.create_brand_get);

// POST create_brand
router.post('/createbrand', brand_controller.create_brand_post);

// GET update_brand 
router.get('/updatebrand', brand_controller.update_brand_get);

// POST update_brand
router.post('/updatebrand', brand_controller.update_brand_post);

// GET delete_brand 
router.get('/deletebrand', brand_controller.delete_brand_get);

// POST delete_brand
router.post('/deletebrand', brand_controller.delete_brand_post);

module.exports = router;