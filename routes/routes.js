'use strict';

var router = require('express').Router();
//var multipart = require('express-formidable').parse;
var basePath = '/v1';

var routeProduct = require('./products_route');



//for Admin UI
router.get(basePath + '/products', routeProduct.getAllProducts); // get all customers
router.post(basePath + '/products', routeProduct.addProduct); // add customers
router.get(basePath + '/products/:productId', routeProduct.getProductById); // get customer by customer id 
router.delete(basePath + '/products/:productId', routeProduct.deleteProductById); // delete customer
router.put(basePath + '/products/:productId', routeProduct.updateProductById); 
module.exports = router;