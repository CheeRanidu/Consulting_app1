import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  addedConsultants: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Consultants",
    },
  ],
});

export default mongoose.model("Admin", adminSchema);