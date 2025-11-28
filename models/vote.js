// models/Vote.js
import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    voterId: {
      type: Number,
      required: true,
      unique: true,
    },
    studentIdCardUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    president: {
      type: String,
      required: true,
    },
    generalSecretary: {
      type: String,
      required: true,
    },
    organizationalSecretary: {
      type: String,
      required: true,
    },
    officeSecretary: {
      type: String,
      required: true,
    },
    financeSecretary: {
      type: String,
      required: true,
    },
    publicitySecretary: {
      type: String,
      required: true,
    },
  },
  {
    collection: "votes",
    timestamps: true,
  }
);

const Vote= mongoose.models.Vote || mongoose.model("Vote", voteSchema);
export default Vote;