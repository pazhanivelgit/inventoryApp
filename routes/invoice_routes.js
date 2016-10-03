
var util = require('../public/util');
var async = require('async');

var item = require("../model/item");
var exculdeFields = {
    __v: false,
    _id: false
};

function getInvoiceById(req, res, next)
{
    //var pid=req.query.productId;
    return res.status(200).json(
        {
         "invoice_id":213434,
         "invoice_date":"",
         "customer":{
             "customer_name":"vel",
             "customer_address":"",
             "customer_mobile":23498723
         },   
        "items":[
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
        }
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