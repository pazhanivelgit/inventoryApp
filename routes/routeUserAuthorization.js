var util = require('../public/util');
var async = require('async');
var userModel = require("../model/user");
var error_const = require('./error_constants.js');
var project = require("../model/project");
var jwt = require('jsonwebtoken');
var config = require('../public/config');
var logger = require("../public/logger");
var sequence_id = require("../model/sequence_userid");

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    BoxSDK = require('box-node-sdk');


function getBOXAcccessToken(appUserId,callback) {
    
    //var sdk = new BoxSDK({
    //    clientID: config.CLIENT_ID,
    //    clientSecret: config.CLIENT_SECRET,
    //    appAuth: {
    //        keyID: config.PUBLIC_KEY_ID,
    //        privateKey: fs.readFileSync(path.resolve(__dirname, config.PRIVATE_KEY_PATH)),
    //        passphrase: config.PRIVATE_KEY_PASSPHRASE
    //    }
    //});
   //var adminAPIClient=sdk.getAppAuthClient('enterprise', config.ENTERPRISE_ID);
    
    var adminAPIClient= util.getBOXAPIClient(false, config.ENTERPRISE_ID); 

   adminAPIClient._session.tokenManager.getTokensJWTGrant('user', appUserId, function (err, accesstokenInfo) {
        if (err) {
            //console.log(err);
            callback(err,null);
        }
        
        callback(null, accesstokenInfo);       
        //var token = accesstokenInfo.accessToken;
    });

}

//token API
exports.generateToken = function generateToken(req, res, next) {

    var u_id = req.body.user_name;
    var resultObj = {};

    if (u_id) {
        userModel.find({ user_name: u_id }, util.exculdeFields, function (err, users) {
            if (err) {
                res.status(400).json(util.showMessage('error:' + err.name));
            } else {
               
                if (users.length > 0) {
                    //var box_user_id = users[0].box_user_id || '297589917';
					var box_user_id = users[0].box_user_id || '278449977';
                    getBOXAcccessToken(box_user_id, function (err, token) {
                        if (err) {
                            res.status(400).json(util.showMessage('error:' + err.name));
                        }
                        console.log("token",token);
                        resultObj.access_token = token.accessToken;
                        res.status(200).json(resultObj);
                    });
                } else {
                    resultObj.success = "false";
                    resultObj.message = "User does not exist";
                    res.status(400).json(resultObj);
                }
            }
        });
    }
    else { 
        res.status(400).json(util.showMessage('error:Invalid User name!'));
    
    }

}

exports.getUserAuthorization=function routeGetUserAuthorization(req, res, next) {
    logger.log('info', 'Authenticate API request body-', JSON.stringify(req.body));
    var resultObj = {};
    var u_id = req.body.user_name;
    var u_password = req.body.password ;
    
    var start = new Date();
    if(u_id && u_password){


        userModel.find({ user_name: u_id}, util.exculdeFields, function(err, users) {
            if (err) {
                logger.log('error', 'mongo error',JSON.stringify(err));
                    res.status(400).json(util.showMessage('error:' + err.name));
                } else {
                
                logger.log('info', 'userdetails-', JSON.stringify(users));           
                //if (users) {
                    if(users.length > 0){

                        if(users[0].password === u_password){
                        resultObj.success = "true";
                        resultObj.user_name = users[0].name;
                            //var token = jwt.sign(users[0],util.secret.secretkey, {
                            //        expiresInMinutes: 1441 // expires in 24 hours
                            //});
                        //resultObj.access_token = token;
                        //var box_user_id = users[0].box_user_id || '297589917';
						var box_user_id = users[0].box_app_user_id || '278449977';
                        resultObj.customer_id = users[0].customer_id;
                        getBOXAcccessToken(box_user_id, function(err,token) {
                            if(err) { 
                                res.status(400).json(util.showMessage('error:' + err.name));
                            }
                            resultObj.access_token = token.accessToken;
                            logger.log('info', 'Authenticate API time taken:' + ((new Date() - start) / 1000) + 'secs');
                            res.status(200).json(resultObj);
                            
                        });
                            
                        }else{
                            var errorObj = {
                                          "error": {
                                            "isError": "true",
                                            "errorCode": "100",                            
                                            "errorMessage": "Incorrect Password"
                                          }
                            };
                            res.status(401).json(errorObj);
                        }
                    }else{
                        var errorObj = {
                                          "error": {
                                            "isError": "true",
                                            "errorCode": "101",                            
                                            "errorMessage": "User does not exist"
                                          }
                    };
                    logger.log('info', 'Authenticate API time taken:' + ((new Date() - start) / 1000) + ' secs');
                        res.status(401).json(errorObj);
                    }
                }
        });
    }
    else{
         var errorObj = {
                                          "error": {
                                            "isError": "true",
                                            "errorCode": "102",                            
                                            "errorMessage": "Invalid params!"
                                          }
            };  
            res.status(400).json(errorObj);
    }
};

exports.authenticateUser=function authenticateUser(req, res, next) {
    
    var resultObj = {};
    var u_id = req.body.user_name;
    var u_password = req.body.password ;
    logger.log('info','Authenticate API request body-',JSON.stringify(req.body));
    
    var start = new Date();
    if(u_id && u_password){
		var query = {
                        $or: [
                            {
                                "project_team.email_address": u_id
                            },
                            {
                                "customer_team.email_address": u_id
                            }
                        ]
                    };

        project.find(query, util.exculdeFields, function(err, users) {
                if (err) {
                    logger.log('error', err.message);
                    res.status(400).json(util.showMessage('error:' + err.name));
                } else {
                
                //if (users) {
                    //console.log("users",users);
                    //logger.log('info','userdetails',JSON.stringify(users));
                    if(users.length > 0){
                    var box_id;
                        if(u_password === 'password1'){
                        resultObj.success = "true";
                        var proj_team = JSON.parse(JSON.stringify(users[0].project_team));
						var cust_team = JSON.parse(JSON.stringify(users[0].customer_team));
                        for (var i = 0; i < proj_team.length; i++) {
                        //for(var i in proj_team ){
                            if(proj_team[i].email_address === u_id){
                                resultObj.name = proj_team[i].name;
                                box_id=proj_team[i].box_app_user_id;
                            }
                        }
						for(var x in cust_team){
                            if(cust_team[x].email_address === u_id){
                                resultObj.name = cust_team[x].name;

                            }
                        }
                            //var token = jwt.sign(users[0],util.secret.secretkey, {
                            //        expiresInMinutes: 1441 // expires in 24 hours
                            //});
                        //resultObj.access_token = token;
                        //var box_user_id = users[0].box_user_id || '297589917';
                        logger.log('info', 'the logged in user-'+u_id+'-box_id is '+ box_id);
                        var box_user_id = box_id|| '278449977'; //users[0].box_user_id || '278449977';
                        resultObj.customer_id = users[0].customer_id;
                        
                        getBOXAcccessToken(box_user_id, function(err,token) {
                            if(err) { 
                                res.status(400).json(util.showMessage('error:' + err.name));
                            }
                            resultObj.access_token = token.accessToken;
                            logger.log('info', 'Authenticate API time taken:' + ((new Date() - start) / 1000) + 'secs');
                            res.status(200).json(resultObj);
                            
                        }); 

                        }else{
                            var errorObj = {
                                          "error": {
                                            "isError": "true",
                                            "errorCode": "100",                            
                                            "errorMessage": "Incorrect Password"
                                          }
                            };
                            res.status(401).json(errorObj);
                        }
                    }else{
                        var errorObj = {
                                          "error": {
                                            "isError": "true",
                                            "errorCode": "101",                            
                                            "errorMessage": "User does not exist"
                                          }
                    };
                    logger.log('info', 'Authenticate API time taken:' + ((new Date() - start) / 1000) + ' secs');
                        res.status(401).json(errorObj);
                    }
                }
        });
    }
    else{
         var errorObj = {
                                          "error": {
                                            "isError": "true",
                                            "errorCode": "102",                            
                                            "errorMessage": "Invalid params!"
                                          }
            };  
            res.status(400).json(errorObj);
    }
};


exports.createUser=function routeCreateUser(req, res, next) {
    
	var u_name = req.body.user_name || req.body.email_address || "NA";
    var u_password = req.body.password || "password1";
    var c_id = req.body.customer_id || 0;
    var box_id = req.body.box_user_id || "NA";
    var username = req.body.name || "NA";
    var authid = req.body.auth0_user_id || "NA";
    var u_title = req.body.title || "NA";
    var mail = req.body.email_address || req.body.user_name ||"NA";
    var photo = req.body.photograph || "NA";
    var phone = req.body.phone_number || "NA";
    var u_group = req.body.group || "NA";
    var u_role = req.body.role || "NA";
    var prof_id = req.body.box_profile_id || "NA";
    var u_type = req.body.user_type || "NA";
    var assgined = "false";
    var box_member_id = req.body.box_group_membership_id || "NA";
    var box_app_uid = req.body.box_app_user_id || "NA";
    var userid = 0;
    var isUser = 0;


    
        var getsequenceid = function(user,next){
            if(isUser === 0){
                sequence_id.find({}, util.exculdeFields, function (err, sid) {
                            if (err) {
                                //res.status(400).json(err);
								logger.log('error', err.message);
								next(err,[]);
                            } else {
                                if (sid.length > 0) {
                                    userid = sid[0].sequence_id ;
                                    next(null,sid);  
                                }
                                else {
                                    //next(null,isUser);
                                }
                            }
                });
            }else{
                next(null,isUser);
            }
        };

        var createnextsqid = function(sid,next){
            if(isUser === 0){
                var nextid = userid +1;

                var update_record = {
                        "sequence_id" : userid
                };
                var updatequery = {$set: { "sequence_id": nextid }};
                sequence_id.update(update_record,updatequery,function(err,seq){
                    if(err){
                        console.error("error updating",err);
						logger.log('error', err.message);
                        next(err,[]);

                    }else{
                        logger.log('info', seq);
                        userid = userid +1;
                        next(null,nextid);
                    }
                });
            }else{
                next(null,isUser);
            }
        };
       

        // to check whether username  already exist or not
        var isUserExist = function(next){
     
            userModel.find({ email_address: mail }, util.exculdeFields, function (err, users) {
                if (err) {
                    //res.status(400).json(err);
					logger.log('error', err.message);
					next(err,[]);
                } else {
                    if (users.length > 0) {
                        isUser = 1;
                        next(null,users);
                    }
                    else {
                        next(null,users);
                    }
                }
            });

        };

        // to insert the data to db
        var insertData = function(users,next){
            if(isUser === 0){

                var _userModel = new userModel({    user_name: u_name,
                                                    password: u_password,
                                                    customer_id: c_id,
                                                    box_user_id: box_id,
                                                    name: username,
                                                    auth0_user_id: authid,
                                                    title: u_title,
                                                    email_address: mail,
                                                    photograph:  photo,
                                                    phone_number: phone,
                                                    group: u_group,
                                                    role: u_role,
                                                    box_profile_id: prof_id,
                                                    user_type: u_type,
                                                    user_id: userid,
                                                    is_assigned: assgined,
                                                    box_group_membership_id: box_member_id,
                                                    box_app_user_id: box_app_uid

                                                });

                _userModel.save(function (err, userObj) {
                    if (err) {
						logger.log('error', err.message);
                        next(err,[]);
                    } else {
                        next(null,[]);
                    }
                });
            }else{				
				var errObj = util.createError(error_const.USEREXIST);
                next(errObj,null);
            }

        };

        var finalResult = function(err,result){
            if(err){
				logger.log('error', err.message);
                res.status(400).json(err);
            }else{
                res.status(200).json(util.showMessage('saved successfully!'));
            }

        };

        async.waterfall([isUserExist,getsequenceid,createnextsqid,insertData],finalResult);

        
    
};

exports.updateUser = function updateUser(req,res,next){

    logger.log('info', 'Update User-Request-', JSON.stringify(req.body));
    console.log("UserAssignedStatus update request receieved");
    var userid = req.params.userID;

    var id = parseInt(userid);
    var updateRecord = req.body;
    var update_record = {
        "user_id" : id
    };
	updateRecord.user_id = id;
    
    userModel.update(update_record,updateRecord,function(err,projstatus){
        if(err){
            console.error("error updating",err);
            res.status(500).json(err);

        }else{
            if(projstatus.n > 0){
                res.status(200).json(util.showMessage('User updated successfully'));
            }else{
                res.status(500).json(util.showMessage('No matching record found'));
            }
        }
    }); 
    
};


exports.createseq = function createseq(req,res,next){

    console.log("createseq");

    var _useq = new sequence_id({ sequence_id: 100000 });
    _useq.save(function (err, userObj) {
                    if (err) {
                        //next(err,[]);
                        console.log("error",err);
                        res.status(500).json(err);
                    } else {
                        //next(null,[]);
                        console.log("added",userObj);
                        res.status(200).json(userObj);
                    }
                });



};

exports.getAllUsers = function getAllUsers(req,res,next){

    console.log("get all users erequest receieved"); 
    logger.log('info', 'get all users erequest receieved');
    var exclude =   util.exculdeFields;
    //exclude.password = false;
    userModel.find({},exclude,function(err,users){
                if(err){
                    next(err,[]);
                }else{
                    res.status(200).json(users);
                }

            });  
    
};

exports.getAllCustomerUser = function getAllCustomerUser(req,res,next){

    var query = { user_type : "customer_team" };
    userModel.find(query,util.exculdeFields,function(err,users){
                if(err){
                    res.status(500).json(err);
                }else{
                    res.status(200).json(users);
                }

    });
};

exports.getAllProjectUser = function getAllProjectUser(req,res,next){

    var query = { user_type : "project_team" };
    userModel.find(query,util.exculdeFields,function(err,users){
                if(err){
                    res.status(500).json(err);
                }else{
                    res.status(200).json(users);
                }

    });
};