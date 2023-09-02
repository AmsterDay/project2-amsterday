const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["museam", "experiece", "food"],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
        },
        investment: {
            type: Number,
            required: true,
        },
        tips: {
            type: String,
        },


    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const User = model("Activities", userSchema);

module.exports = User;