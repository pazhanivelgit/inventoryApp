var mongoose = require('./db.js');

var user_schema = new mongoose.Schema({
    user_name : String, 
    password: String,
    customer_id : Number,
    box_user_id:String,
    name: String,
    auth0_user_id: String,
    title: String,
    email_address: String,
    photograph: String,
    phone_number: String,
    group: String,
    role: String,
    box_profile_id: String,
    user_type: String,
    user_id : Number,
    is_assigned : String,
    box_group_membership_id : String,
    box_app_user_id: String
});

var user = mongoose.model('User',user_schema);

module.exports = user;