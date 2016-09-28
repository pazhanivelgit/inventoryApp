var mongoose = require('mongoose');
//mongoose.connect('mongodb://blueprintapp:c0gn1zant@172.31.200.51:27017/blueprint');
//mongoose.connect('mongodb://10.243.194.97:27017/test');
mongoose.connect('mongodb://localhost/test');
module.exports = mongoose;