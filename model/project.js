var mongoose = require('./db.js');

var project_schema = new mongoose.Schema(
    {
        project_id: Number,
        customer_id: Number,
        project_detail: {
            project_name: String, 
            project_id: Number,
            project_location: String,
            hero_image: String,
            project_description: String,
            schedule_url: String,
            budget_url: String,
            goals_url: String,
            box_folder_id: String
        },
        box_logs:{
        exec_only_folder_id: String,
        all_users_folder_id: String,
        exec_only_group_id: String,
        all_users_group_id: String
        },
        notifications: [
            {
                headlines: String,
                date: String,
                link: String,
                text: String,
                icon_type:String,
                activity_type : String,
				location : String,
                postedby : {
                    username : String,
                    userimage : String
                }
            }
        ],
        project_team: [
            {
                name: String,
                auth0_user_id: String,
                email_address: String,
                photograph: String,
                title: String,
                phone_number: String,
                group: String,
                box_app_user_id: String,
                box_group_membership_id: String,
				user_id: String,
                box_collaboration_id: String
            }
        ],
        customer_team: [
            {
                name: String,
                auth0_user_id: String,
                email_address: String,
                role: String,
                box_app_user_id:String,
                box_group_membership_id: String,
                box_collaboration_id: String
            }
        ],
        goals: [
            {
                goal_name: String,
                text: String,
                date: String,
                icon_type:String
            }
        ],
        status: {
            overall_status: String,
            phase_collection: [{
                    phase_name: String,
                    phase_order: Number,
                    phase_status: String,
                    completion_date: String
                }
            ]
        
        }
    }
);

var project = mongoose.model('project', project_schema);

module.exports = project;