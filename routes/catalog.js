var express = require('express');
var router = express.Router();

var shoe_controller = require('../controllers/shoeController');
var brand_controller = require('../controllers/brandController');
var shoe_instance_controller = require('../controllers/shoeInstanceController');


router.get('/', shoe_controller.index);