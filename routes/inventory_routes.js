'use strict';

var router = require('express').Router();
var basePath = '/stocks/v1';

var exculdeFields = {
    __v: false,
    _id: false
};


function getItemsByProductId(req, res, next)
{
    //var pid=req.query.productId;
    return res.status(200).json([
            {
                "item_id":4932,
                "qty": 10,
                "buy_price": 90.5,
                "sell_price": 95,
                "expiry_date": "aug10",
                "vendor_name": "AKS"
            },
            {
                "item_id":4933,
                "qty": 20,
                "buy_price": 90.5,
                "sell_price": 95,
                "expiry_date": "aug10",
                "vendor_name": "AKS"
            },
            {
                "item_id":4934,
                "qty": 20,
                "buy_price": 90.5,
                "sell_price": 95,
                "expiry_date": "aug10",
                "vendor_name": "AKS"
            }
        ]
        );
}


function routeGetInventoryRequest(req, res, next) {
    return res.status(200).json([{
        "product_id": 16237812,
        "product_name": "Original Mango Drink",
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
            "stocks": 150,
            "stockItems": []
        }
    ]
    );
}

router.get(basePath + '/products/:id', getItemsByProductId);
router.get(basePath + '/products', routeGetInventoryRequest);


module.exports = router;