const { Schema, model } = require("mongoose");
const User = require('../models/User.model');


// TODO: Please make sure you edit the User model to whatever makes sense in this case
const activitySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["museum", "experience", "food"],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        review: {
            type: Number,
        },
        tips: {
            type: String,
        },
        image: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
       
    
        
       
    }
);

module.exports = model("Activity", activitySchema);