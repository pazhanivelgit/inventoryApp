var winston = require('winston');
var path = require('path');
winston.emitErrs = true;
// Ref- http://tostring.it/2014/06/23/advanced-logging-with-nodejs/

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: path.resolve(__dirname, './all-logs.log'),
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: true,
            colorize: false
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};