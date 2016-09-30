var mongoose = require('./db.js');

var product_schema = new mongoose.Schema({
    product_name: String, 
    product_id: { type: Number, index: true },
    description: String 
});

var product = mongoose.model('product', product_schema);

module.exports = product;