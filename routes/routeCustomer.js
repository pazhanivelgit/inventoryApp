var util = require('../public/util');
var async = require('async');
var error_const = require('./error_constants.js');
var logger = require("../public/logger");
var config = require('../public/config');


exports.deleteCustomerById = function deleteCustomerById(req, res, next) {
    var cus_id = req.params.customerId;
    var id = parseInt(cus_id);
    var customer = require("../model/customer");
    customer.findOneAndRemove({ customer_id: id }, function (err,status) {
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


exports.getCustomerById = function routeGetCustomerById(req, res, next) {
    var cus_id = req.params.customerId;
    if (cus_id) {
        
        var id = parseInt(cus_id);
        var customer = require("../model/customer");
        
        customer.find({ customer_id: id }, util.exculdeFields, function (err, customer) {
            if (err) {
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
                
                if (customer.length > 0) {
                    res.status(200).json(customer[0]);
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

exports.getAllCustomers=function routeGetAllCustomersRequest(req, res, next) {
    
    var customer = require("../model/customer");
    
    customer.find({}, util.exculdeFields, function (err, customers) {
        if (err) {
            res.status(400).json(util.showMessage('error:' + err.name));
        } else {
            
            var resp = {
                'total_count': customers.length,
                'entries': customers
            }
            res.status(200).json(resp);
        }
    });
}

exports.addCustomer=function routeCustomerInsertRequest(req, res, next) {
    
    var c_name = req.body.customer_name;
    var c_id = req.body.customer_id;
    //var c_folder_id = '5010309';
    
    if (c_name && c_id) {
        
        

        var customer = require("../model/customer");
        //var _customer = new customer({ customer_name: c_name,customer_id: c_id,box_root_folder_id: c_folder_id});

        // to check whether customer id already exist or not
        var isCustomerExist = function(next){
            //var isCustomer = 0;
            req.isCustomer = 0;
            customer.find({ customer_id: c_id }, util.exculdeFields, function (err, customer) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    if (customer.length > 0) {
                        req.isCustomer = 1;
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
            if (req.isCustomer === 0) {
                
                var folder_id = req.box_folder_id;
                var miscelleous_id = req.box_miscelleous_folder_id;

                //var customer = require("../model/customer");
                var _customer = new customer({ customer_name: c_name, customer_id: c_id, box_root_folder_id: folder_id,box_miscelleous_folder_id: miscelleous_id});

                _customer.save(function (err, userObj) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        next(null,[]);
                    }
                });
            }else{
                var errObj = util.createError(error_const.CUSTOMEREXIST);
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

        
        //async.waterfall([isCustomerExist, CreateCustomerFolder, CreateMiscelleousFolder, insertData], finalResult);
        async.waterfall([isCustomerExist, CreateCustomerFolder, insertData], finalResult);

    }
    else {
        res.status(400).json(util.showMessage('Invalid params!'));
    }
}

function CreateCustomerFolder(req, callback) {
    if (req.isCustomer === 0) {
        var customerName = req.body.customer_name;
        CreateBoxFolder('11019418075', customerName, function (err, folder) {
            if (err) {
                //logger.log('error', err.message);
                callback(err, null);
            }
            else {
                req.box_folder_id = folder.id;
                callback(null, req);
            }
        });
    }
    else { 
        callback(null, req);
    }
}

function CreateMiscelleousFolder(req, callback) {
    if (req.isCustomer === 0) {
    var parentId = req.box_folder_id;
    CreateBoxFolder(parentId, 'Miscellaneous', function (err, folder) {
        if (err) {
            //logger.log('error', err.message);
            callback(err, null);
        }
        else {
            req.box_miscelleous_folder_id = folder.id;
            callback(null, req);
        }
    });
}
    else {
        callback(null, req);
    }
}



function CreateBoxFolder(parentId, folderName, callback) {
    var adminAPIClient = util.getBOXAPIClient(true, config.ADMIN_ID);
    
    adminAPIClient.folders.create(parentId, folderName, function (err, folder) {
        if (err) {
            logger.log('error', 'error in folder creation:' + err.message);
            callback(err, null);
        }
        else {
            logger.log('info', 'Created folderName:' + folder.name);
            callback(null, folder);
        }
    });
}
