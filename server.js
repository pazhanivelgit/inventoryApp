/* jshint strict: true */
/* global require, console */


/**
 * module dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require("./public/logger");

/**
 * init
 */
var routes = require('./routes/routes.js');
var http_server = express();




/**
 * dispatch requests to the router
 */
http_server.disable('x-powered-by');
http_server.enable('etag', 'strict');
http_server.use(bodyParser.json());
//http_server.use(morgan('dev'));
logger.debug("Overriding 'Express' logger");
http_server.use(require('morgan')({ "stream": logger.stream }));

//http_server.use(express.urlencoded());
//http_server.use(http_server.router);

//http_server.use('/', routes);
//var dirName=__dirname.replace('\api','');
http_server.use('/', express.static(__dirname + '/ui'));
http_server.use('/', routes);

http_server.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.end('error ' + err.message);
});

//process.on('uncaughtException', function (err) {
//    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
//    console.error(err.stack)
//    //process.exit(1)
//})

/**
 * instantiate express server
 */

//var port=process.env.PORT ||8080;
var port = 8080;
http_server.listen(port, function () {
    'use strict';
    console.log('Express server listening on port-'+ port);
});
