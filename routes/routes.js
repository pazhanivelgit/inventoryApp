'use strict';

var router = require('express').Router();
var multipart = require('express-formidable').parse;
var basePath = '/pw/v1';

var routeProduct = require('./product_route');



//for Admin UI
router.get(basePath + '/customers', routeProduct.getAllProducts); // get all customers
router.post(basePath + '/customers', routeProduct.addProduct); // add customers
router.get(basePath + '/customers/:customerId', routeProduct.getProductById); // get customer by customer id 
router.delete(basePath + '/customers/:customerId', routeProduct.deleteProductById); // delete customer

module.exports = router;