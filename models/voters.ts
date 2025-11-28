// models/Voter.js
import mongoose from "mongoose";

const voterSchema = new mongoose.Schema(
  {
    voterId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    voted: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  {
    collection: "voters",
  }
);

const Voter = mongoose.models.Voter || mongoose.model("Voter", voterSchema);
export default Voter;
