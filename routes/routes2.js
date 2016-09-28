'use strict';

var router = require('express').Router();
var basePath = '/pw/v1';

var routeCustomer = require('./routeCustomer');
var routeProject = require('./routeProject');
var routeNotifications = require('./routeNotifications');
var routeProjectTeam = require('./routeProjectTeam');
var routeCustomerTeam = require('./routeCustomerTeam');
var routeGoals = require('./routeGoals');
var routeStatus = require('./routeStatus');



var exculdeFields = {
    __v: false,
    _id: false
};




function routeProjectsRequest(req, res, next) {
    return res.status(200).json({
        "projects": [  
            {
                "project_details": {
                    "project_name": "National Center for Civil and Human Rights",
                    "project_id": 23987429,
                    "date": "10/2/15",
                    "overall_status": "on Track"
                },
                "project_status": {
                    "overall_status": "not statrted",
                    "phase_name": "Design",
                    "Phase_order": "1",
                    "Phase_status": "Incomplete"
                }
            },
            {
                "project_details": {
                    "project_name": "National Center for Civil and Human Rights",
                    "project_id": 23987426,
                    "date": "10/2/15",
                    "overall_status": "on Track"
                },
                "project_status": {
                    "overall_status": "not statrted",
                    "phase_name": "Design",
                    "Phase_order": "1",
                    "Phase_status": "Incomplete"
                }
            },
            {
                "project_details": {
                    "project_name": "National Center for Civil and Human Rights",
                    "project_id": 23987427,
                    "date": "10/2/15",
                    "overall_status": "on Track"
                },
                "project_status": {
                    "overall_status": "not statrted",
                    "phase_name": "Design",
                    "Phase_order": "1",
                    "Phase_status": "Incomplete"
                }
            }
        ]
    }
    );
}


function routeProjectDetailsRequest(req, res, next) {
    return res.status(200).json({
        "project_details": {
            "project_name": "National Center for Civil and Human Rights",
            "project_id": "33298479",
            "project_location": "123 BeachTree GA 2333",
            "hero_image": "http://blogs.intel.com/iot/files/2015/01/SmartBuilding.jpg",
            "project_description": "pdetails"
        }
    }
);
}

function routeProjectStatusRequest(req, res, next) {
    return res.status(200).json({
        "project_status": {
            "overall_status": "not statrted",
            "phase_name": "Design",
            "Phase_order": "1",
            "Phase_status": "Incomplete"

        }
    }
    );
}

function routeProjectGoalsRequest(req, res, next) {
    return res.status(200).json({
        "goals": [  
            {
                "goal_name": "Meet deadline",
                "text": "some text",
                "date": "25/07/2016",
                "icon_type": "exlamation"
            },
            {
                "goal_name": "g1",
                "text": "",
                "date": "",
                "icon_type": ""
            },
            {
                "goal_name": "g1",
                "text": "",
                "date": "",
                "icon_type": ""
            }
        ]
    });
}

function routeProjectNotificationsRequest(req, res, next) {
    return res.status(200).json({
        "notifications": [  
            {
                "headlines": "remind deadline",
                "date": "25/07/2016",
                "link": "url",
                "text": "some text",
                "icon_type": "exclamation"
            },
            {
                "headlines": "",
                "date": "",
                "link": "url",
                "text": "",
                "icon_type": ""
            },
            {
                "headlines": "",
                "date": "",
                "link": "url",
                "text": "",
                "icon_type": ""
            }
        ]
    }
);
}


function routeProjectCustomerteamRequest(req, res, next) {
    return res.status(200).json({
        "customer_team": [  
            {
                "name": "srini",
                "email": "@gmail.com",
                "role": "rname"
            },
            {
                "name": "vel",
                "email": "@gmail.com",
                "role": "rname"
            },
            {
                "name": "nitin",
                "email": "@gmail.com",
                "role": "rname"
            }
        ]
    }
    );
}
function routeProjectProjectteamRequest(req, res, next) {
    return res.status(200).json({
        "project_team": [  
            {
                "name": "raja",
                "email": "raja@gmail.com",
                "photo": "URL",
                "title": "SM",
                "phone_number": "231241234"
            },
            {
                "name": "",
                "email": "@gmail.com",
                "photo": "URL",
                "title": "",
                "phone_number": ""
            },
            {
                "name": "",
                "email": "@gmail.com",
                "photo": "URL",
                "title": "",
                "phone_number": ""
            }
        ]
    }
   );
}

function routeAuthenticateRequest(req, res, next) {
    return res.status(200).json({
        "success": true,
        "access_token": "YXA6ojkALgyxcpqVZwTfKxEPNsBpU5g"
    }
    );
}

function routeCustomersRequest(req, res, next) {
    return res.status(200).json({
        "customers_list": [  
            {
                "customer_name": "3M",
                "customer_id": "12345"
            },
            {
                "customer_name": "ADP",
                "customer_id": "12346"
            },
            {
                "customer_name": "Civil Arch",
                "customer_id": "12347"
            },
            {
                "customer_name": "Perkin",
                "customer_id": "12348"
            }
        ]
    }
    );
}

function routeCustomerSetupRequest(req, res, next) {
    return res.status(200).json({
        "message":"created successfully!"
    }
    );
}


function routeProjectSetupRequest(req, res, next) {
    return res.status(200).json({
        "message": "created successfully!"
    }
    );
}


//router.get(basePath + '/projects', routeProjectsRequest);
router.get(basePath+'/:projectId/details', routeProjectDetailsRequest);
router.get(basePath +'/:projectId/status', routeProjectStatusRequest);
router.get(basePath +'/:projectId/goals', routeProjectGoalsRequest);
router.get(basePath +'/:projectId/notifications', routeProjectNotificationsRequest);
router.get(basePath +'/:projectId/customerteam', routeProjectCustomerteamRequest);
router.get(basePath +'/:projectId/projectteam', routeProjectProjectteamRequest);
router.post(basePath +'/authenticate', routeAuthenticateRequest);

//for Admin UI
router.get(basePath + '/customers', routeCustomer.getAllCustomers);
router.post(basePath + '/customers', routeCustomer.addCustomer);
router.get(basePath + '/customers/:customerId', routeCustomer.getCustomerById);


router.post(basePath + '/customers/:customerId/projects', routeProject.addProject);//routeProjectSetupRequest);
router.get(basePath + '/customers/:customerId/projects/:projectId', routeProject.getProjectById);
router.get(basePath + '/customers/:customerId/projects', routeProject.getAllProjects);


//router.get(basePath + '/projects/:projectId/notifications', routeProject.getNotificationsByProjId);
router.get(basePath + '/customers/:customerId/projects/:projectId/notifications', routeNotifications.getNotificationsByProjID);
router.get(basePath + '/customers/:customerId/projects/:projectId/project_team', routeProjectTeam.getProjectTeamByProjID);
router.get(basePath + '/customers/:customerId/projects/:projectId/customer_team', routeCustomerTeam.getCustomerTeamByProjID);
router.get(basePath + '/customers/:customerId/projects/:projectId/goals', routeGoals.getGoalsByProjID);
router.get(basePath + '/customers/:customerId/projects/:projectId/status', routeStatus.getStatusByProjID);


module.exports = router;