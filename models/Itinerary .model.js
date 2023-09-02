const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    title: {
      type: String,
      required: true,      
    },
    description: {
      type: String,
      required: true,          
    },
    activities: {
      type: Schema.Types.ObjectId,
      ref: "Activities",
      required: true,
    },
    duration: {
        type: Number,                 
      },
      investment: {
        type: Number, 
        required: true,                
      }, 
      review: {
        type: Number,                         
      },
      image: {
        data: Buffer,
        contentType: String                         
      },       
           
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("Itinerary ", userSchema);

module.exports = User;