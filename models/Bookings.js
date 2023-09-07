import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  consultant: {
    //type:String,
    type: mongoose.Types.ObjectId,
    ref: "Consultants",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  user: {
    //type: String,
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
}); 

export default mongoose.model("Booking", bookingSchema);