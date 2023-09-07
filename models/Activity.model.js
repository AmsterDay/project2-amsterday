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
        imageUrl: {
            type: String, 
          },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        like: [{
            type: Schema.Types.ObjectId, ref: "User"
        }]
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

module.exports = model("Activity", activitySchema);