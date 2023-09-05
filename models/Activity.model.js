const { Schema, model } = require("mongoose");

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

    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

module.exports = model("Activity", activitySchema);