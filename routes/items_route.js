'use strict';

var util = require('../public/util');
var async = require('async');

var item = require("../model/item");
var exculdeFields = {
    __v: false,
    _id: false
};



exports.updateItemById = function updateItemById(req, res, next) {
    var item_id = req.params.itemId;
    var id = parseInt(item_id);
    item.findOneAndUpdate({ item_id: id }, req.body, function (err, status) {
        if (err) {
            res.status(400).json(util.showMessage('error:' + err.name));
        } else {
            if (status) {
                res.status(200).json(util.showMessage('Updated!'));
            } else {
                res.status(500).json(util.showMessage('No matching record found'));
            }
        }
    });
};



exports.deleteItemById = function deleteItemById(req, res, next) {
    var item_id = req.params.itemId;
    var id = parseInt(item_id);
    //var item = require("../model/item");
    item.findOneAndRemove({ item_id: id }, function (err,status) {
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


exports.getItemById = function routeGetItemById(req, res, next) {
    var id = req.params.itemId;
    if (id) {
        
        var i_id = parseInt(id);
        //var item = require("../model/item");
        
        item.find({ item_id: i_id }, util.exculdeFields, function (err, item) {
            if (err) {
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
                
                if (item.length > 0) {
                    res.status(200).json(item[0]);
                }
                else {
                    res.status(404).json(util.showMessage('No records found!'));
                }
            }
        });
    }
    else {
        res.status(400).json(util.showMessage('Invalid params!'));
    }
}

exports.getAllItems=function routeGetAllItemsRequest(req, res, next) {
    //var item = require("../model/item");
    item.find({}, util.exculdeFields, function (err, items) {
        if (err) {
            res.status(400).json(util.showMessage('error:' + err.name));
        } else {
            
            //var resp = {
            //    'total_count': items.length,
            //    'entries': items
            //}
            res.status(200).json(items);
        }
    });
}


exports.addItem=function routeItemInsertRequest(req, res, next) {
    var prod_id=req.params.productId;
    var id = req.body.item_id;
    var qty = req.body.qty;
    var free = req.body.free||'NA';
    var buy_price = req.body.buy_price||'NA';
    var sell_price = req.body.sell_price;
    var buy_date = req.body.buy_date;
    var expiry_date = req.body.expiry_date;
    var vendor_name = req.body.vendor_name||'NA';
    var desc = req.body.description;

    if (prod_id && id && qty && expiry_date) {
        //var item = require("../model/item");
        var isItemExist = function(next){
            req.isItem = 0;
            item.find({ item_id: id }, util.exculdeFields, function (err, item) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    if (item.length > 0) {
                        req.isItem = 1;
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
            if (req.isItem === 0) {
                var _item = new item({product_id:prod_id, item_id:id,qty:qty,free:free,buy_price:buy_price,sell_price:sell_price,buy_date:buy_date,expiry_date:expiry_date,vendor_name:vendor_name, description:desc});
                _item.save(function (err, prodObj) {
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
        async.waterfall([isItemExist, insertData], finalResult);

    }
    else {
        res.status(400).json(util.showMessage('Invalid params!'));
    }
}




