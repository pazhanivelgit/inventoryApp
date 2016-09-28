'use strict';

var router = require('express').Router();
var multipart = require('express-formidable').parse;
var basePath = '/pw/v1';

var routeCustomer = require('./routeCustomer');
var routeProject = require('./routeProject');
var routeNotifications = require('./routeNotifications');
var routeProjectTeam = require('./routeProjectTeam');
var routeCustomerTeam = require('./routeCustomerTeam');
var routeGoals = require('./routeGoals');
var routeStatus = require('./routeStatus');
var routeUserAuth = require('./routeUserAuthorization');
var routeFinalizeSetup = require('./routeFinalizeSetup');
var routeLogs = require('./routeLogs');
var routeFileUpload = require('./routeUploadFile');
var routeSendMail = require('./routeSendGridMail');
var routeCreateBoxFolders = require('./routeCreateBoxFolders');
var routeDownload = require('./routeDownloads');



//router.post(basePath + '/authenticate', routeUserAuth.getUserAuthorization);
router.post(basePath + '/authenticate', routeUserAuth.authenticateUser); // to authenticate a user
router.post(basePath + '/token', routeUserAuth.generateToken); // generating token


//for Admin UI
router.get(basePath + '/customers', routeCustomer.getAllCustomers); // get all customers
router.post(basePath + '/customers', routeCustomer.addCustomer); // add customers
router.get(basePath + '/customers/:customerId', routeCustomer.getCustomerById); // get customer by customer id 
router.delete(basePath + '/customers/:customerId', routeCustomer.deleteCustomerById); // delete customer

router.post(basePath + '/customers/:customerId/projects', routeProject.addProject);//routeProjectSetupRequest);
router.put(basePath + '/customers/:customerId/projects', routeProject.updateProject); // update entire project
router.delete(basePath + '/projects/:projectId', routeProject.deleteProjectById);


router.get(basePath + '/customers/:customerId/projects/:projectId', routeProject.getProjectById); // get project by id
router.get(basePath + '/customers/:customerId/projects', routeProject.getAllProjects); // get all projects under a customer


//router.get(basePath + '/projects/:projectId/notifications', routeProject.getNotificationsByProjId);
router.get(basePath + '/customers/:customerId/projects/:projectId/notifications', routeNotifications.getNotificationsByProjID); //get notifications by project id
router.get(basePath + '/customers/:customerId/projects/:projectId/project_team', routeProjectTeam.getProjectTeamByProjID); //get project team by project id
router.get(basePath + '/customers/:customerId/projects/:projectId/customer_team', routeCustomerTeam.getCustomerTeamByProjID); //get customer team by project id
router.get(basePath + '/customers/:customerId/projects/:projectId/goals', routeGoals.getGoalsByProjID); // get goals by project id
router.get(basePath + '/customers/:customerId/projects/:projectId/status', routeStatus.getStatusByProjID); // get status by project id
router.get(basePath + '/users/:userID/projects', routeProject.findProjectByUserID); // find project by userid - not implemented entirely
router.get(basePath + '/users',routeUserAuth.getAllUsers); // get all users in db
router.get(basePath + '/users/customeruser',routeUserAuth.getAllCustomerUser); // get all customer team users
router.get(basePath + '/users/projectuser',routeUserAuth.getAllProjectUser); // get all project team users

router.post(basePath + '/users', routeUserAuth.createUser); //for user creation
router.post(basePath + '/users/seq', routeUserAuth.createseq); // to create seq in db


// Updating data
router.put(basePath + '/customers/:projectId/status', routeStatus.updateStatus); //update status of a project
router.put(basePath + '/customers/:projectId/goals', routeGoals.updateGoals); // update goals of a project
router.put(basePath + '/customers/:projectId/notifications', routeNotifications.updateNotifications);// update notifications of a project
router.put(basePath + '/customers/:projectId/project_team', routeProjectTeam.updateProjectTeam); // update project team of a project
router.put(basePath + '/customers/:projectId/customer_team', routeCustomerTeam.updateCustomerTeam); //update customer team of a project
router.put(basePath + '/customers/:projectId/project_detail', routeProject.updateProjectDetails); //update project details of a project
router.put(basePath + '/customers/:projectId/createNotification',routeNotifications.addNotifications); // add notification to a project ( for ios team)
router.put(basePath + '/users/:userID',routeUserAuth.updateUser); // to update a user

router.post(basePath + '/customers/:customerId/projects/:projectId/finalize_setup', routeFinalizeSetup.finalizeSetup); // finalise setup

router.get(basePath + '/logs', routeLogs.getLogs); // getting logs

router.post(basePath + '/upload/:folderId', multipart(), routeFileUpload.uploadFile); // uploading file 

router.post(basePath + '/uploadProfilePic/:folderId', multipart(), routeFileUpload.uploadProfilePic); // uploading file 

router.post(basePath + '/customers/:customerId/projects/:projectId/send_mail', routeSendMail.sendMail); // sending mail


router.post(basePath + '/customers/:customerId/folders/:folderId', routeCreateBoxFolders.createProjectsFolders); // creating project folder

router.get(basePath + '/images/:fileId', routeDownload.downloadFile); // 




module.exports = router;