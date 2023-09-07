import mongoose from "mongoose";

const consultantsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  jobs: [{ type: String, required: true }],
  availableDates: {
    type: Date,
    required: true,
  },
  country:{
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

export default mongoose.model("Consultants", consultantsSchema);