'use strict';

var router = require('express').Router();
var util = require('../public/util');
var async = require('async');
var basePath = '/v1';

var exculdeFields = {
    __v: false,
    _id: false
};


exports.deleteProductById = function deleteProductById(req, res, next) {
    var cus_id = req.params.productId;
    var id = parseInt(cus_id);
    var product = require("../model/product");
    product.findOneAndRemove({ product_id: id }, function (err,status) {
        if (err) {
            res.status(400).json(util.showMessage('error:' + err.name));
        }else{
            if(status){
                res.status(200).json(util.showMessage('deleted!'));
            }else{
                 res.status(500).json(util.showMessage('No matching record found'));
            }              
        }
    });
};


exports.getProductById = function routeGetProductById(req, res, next) {
    var cus_id = req.params.productId;
    if (cus_id) {
        
        var id = parseInt(cus_id);
        var product = require("../model/product");
        
        product.find({ product_id: id }, util.exculdeFields, function (err, product) {
            if (err) {
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
                
                if (product.length > 0) {
                    res.status(200).json(product[0]);
                }
                else {
                    res.status(400).json(util.showMessage('No records found!'));
                }
            }
        });
    }
    else {
        res.status(400).json(util.showMessage('Invalid params!'));
    }
}

exports.getAllProducts=function routeGetAllProductsRequest(req, res, next) {
    
    var product = require("../model/product");
    
    product.find({}, util.exculdeFields, function (err, products) {
        if (err) {
            res.status(400).json(util.showMessage('error:' + err.name));
        } else {
            
            var resp = {
                'total_count': products.length,
                'entries': products
            }
            res.status(200).json(resp);
        }
    });
}


exports.addProduct=function routeProductInsertRequest(req, res, next) {
    var p_name = req.body.product_name;
    var p_id = req.body.product_id;
    var desc=req.body.description;

    if (p_name && p_id) {
        var product = require("../model/product");
        var isProductExist = function(next){
            req.isProduct = 0;
            product.find({ product_id: p_id }, util.exculdeFields, function (err, product) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    if (product.length > 0) {
                        req.isProduct = 1;
                        next(null,req);
                    }
                    else {
                        next(null,req);
                    }
                }
            });

        };

        // to insert the datat to db
        var insertData = function(req,next){
            if (req.isProduct === 0) {
                var _product = new product({ product_name: p_name, product_id: p_id, description:desc});

                _product.save(function (err, prodObj) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        next(null,prodObj);
                    }
                });
            }else{
                var errObj = util.showMessage('Already exist!');
                next(errObj,null);
            }
        };

        var finalResult = function(err,result){
            if(err){
                res.status(400).json(err);
            }else{
                res.status(200).json(util.showMessage('saved successfully!'));
            }

        };
        async.waterfall([isProductExist, insertData], finalResult);

    }
    else {
        res.status(400).json(util.showMessage('Invalid params!'));
    }
}




function getItemsByProductId(req, res, next)
{
    //var pid=req.query.productId;
    return res.status(200).json([
            {
                "item_id":4932,
                "qty": 10,
                "free": 1,
                "buy_price": 90.5,
                "sell_price": 95,
                "expiry_date": "aug10",
                "buy_date": "aug10",
                "vendor_name": "AKS"
            },
            {
            "item_id":5932,
                "qty": 20,
                "free": 2,
                "buy_price": 90.5,
                "sell_price": 95,
                "expiry_date": "aug10",
                "buy_date": "aug10",
                "vendor_name": "AKS"
            },
            {
            "item_id":4932,
                "qty": 50,
                "free": 10,
                "buy_price": 90.5,
                "sell_price": 95,
                "expiry_date": "aug10",
                "buy_date": "aug10",
                "vendor_name": "AKS"
            }
        ]
        );
}


function routeGetInventoryRequest(req, res, next) {
    return res.status(200).json([{
        "product_id": 16237812,
        "product_name": "Original Mango Drink",
        "description":"it original from Dubai",
        "stocks":50,
        "stockItems": [
            {
                "qty": 10,
                "buy_price": 90.5,
                "sell_price": 95,
                "expiry_date": "aug10",
                "vendaor_name": "AKS"
            },
            {
                "qty": 10,
                "buy_price": 90.5,
                "sell_price": 95,
                "expiry_date": "aug10",
                "vendaor_name": "AKS"
            },
            {
                "qty": 10,
                "buy_price": 90.5,
                "sell_price": 95,
                "expiry_date": "aug10",
                "vendaor_name": "AKS"
            }
        ]
        },
        {
            "product_id": 17237812,
            "product_name": "Pepsi Drink",
            "description":"it pepsi from Dubai",
            "stocks": 150,
            "stockItems": []
        }
    ]
    );
}

router.get(basePath + '/products/:id', getItemsByProductId);
router.get(basePath + '/products', routeGetInventoryRequest);


module.exports = router;