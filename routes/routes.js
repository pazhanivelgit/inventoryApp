'use strict';

var router = require('express').Router();
//var multipart = require('express-formidable').parse;
var basePath = '/v1';





//for products
var routeProduct = require('./products_route');
router.get(basePath + '/products', routeProduct.getAllProducts); 
router.post(basePath + '/products', routeProduct.addProduct); 
router.get(basePath + '/products/:productId', routeProduct.getProductById);  
router.delete(basePath + '/products/:productId', routeProduct.deleteProductById); 
router.put(basePath + '/products/:productId', routeProduct.updateProductById); 

// for items
var routeItem = require('./items_route');
router.get(basePath + '/products/:productId/items', routeItem.getAllItems); 
router.post(basePath + '/products/:productId/items', routeItem.addItem); 
router.get(basePath + '/products/:productId/items/:itemId', routeItem.getItemById);  
router.delete(basePath + '/products/:productId/items/:itemId', routeItem.deleteItemById); 
router.put(basePath + '/products/:productId/items/:itemId', routeItem.updateItemById); 

//search item

router.get(basePath + '/items/search', routeItem.getSearchItems); 


module.exports = router;