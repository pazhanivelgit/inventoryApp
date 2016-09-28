'use strict';

var ERROR_CONSTANTS = {

  USEREXIST: {
    "errorCode": "PWERR03",
    "message": "User with same UserName or email already present"
  },
  CUSTOMEREXIST: {
    "errorCode": "PWERR01",
    "message": "Customer with same CustomerID already present"
  },
  PROJECTEXIST: {
    "errorCode": "PWERR02",
    "message": "Project with same ProjectID already present"
  }
  


};

module.exports = ERROR_CONSTANTS;