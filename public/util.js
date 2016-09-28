var config = require('../public/config');
var path = require('path'),
    fs = require('fs'),
    BoxSDK = require('box-node-sdk');

exports.exculdeFields = {
    __v: false,
    _id: false
};


//changed
exports.createError = function(errEnum) {
    var err = new Error();
	//err.name is added to aid, winston logging. By default if object is instance of error, winston logs stack info & err.message, err.name.
	//Custom properties, in this case errorCode are not printed.
    err.name = errEnum.errorCode;
	err.errorCode = errEnum.errorCode;
    err.message = errEnum.message;
    return err;
  }

//

exports.showMessage=function showMessage(errMsg) {
    return { 'message': errMsg }
}


exports.secret = {
    'secretkey': 'pwuserauthsecretkey'
};

exports.isStringBlank=function isStringBlank(str) {
    return (str === undefined || str === null || str.trim().length === 0);
}

exports.getBOXAPIClient = function getBOXAPIClient(isUser,id) {
    var sdk = new BoxSDK({
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        appAuth: {
            keyID: config.PUBLIC_KEY_ID,
            privateKey: fs.readFileSync(path.resolve(__dirname, config.PRIVATE_KEY_PATH)),
            passphrase: config.PRIVATE_KEY_PASSPHRASE
        }
    });
    
    var userOrEnterprise = isUser?'user':'enterprise';
    
    var adminAPIClient = sdk.getAppAuthClient(userOrEnterprise, id);
    return adminAPIClient;
}
