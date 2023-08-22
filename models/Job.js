const mongoose = require("mongoose");

const job_schema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide the company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "please provide the position of the job"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

const job_model = mongoose.model("Job", job_schema);

module.exports = job_model;
