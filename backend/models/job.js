const mongoose = require("mongoose");
const Company = require("./company");
const Comment = require("./comment");

const jobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Company,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  position: {
    type: String,
  },
  intro: {
    type: String,
  },
  location: {
    type: String,
  },
  salary: {
    type: Number,
  },
  deadline: {
    type: Date,
  },
  noOfPost: {
    type: Number,
  },
  requirements: {
    type: String,
  },
  Responsibilities: {
    type: String,
  },
});

module.exports = mongoose.model("Job", jobSchema);
