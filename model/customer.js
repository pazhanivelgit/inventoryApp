var mongoose = require('./db.js');

var customer_schema = new mongoose.Schema({
    customer_name: String, 
    customer_id: { type: Number, index: true },
    box_root_folder_id: String,
    box_miscelleous_folder_id: String 
});

var customer = mongoose.model('customer', customer_schema);

module.exports = customer;