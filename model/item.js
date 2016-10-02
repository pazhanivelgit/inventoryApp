var mongoose = require('./db.js');

var item_schema = new mongoose.Schema({
    product_id: Number, 
    item_id: { type: Number, index: true },
    qty: Number,
    free: String,
    buy_price: Number,
    sell_price: Number,
    buy_date: Date,
    expiry_date: Date,
    vendor_name:String,
    description: String 
});

var item = mongoose.model('item', item_schema);

module.exports = item;