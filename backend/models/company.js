const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  accountType: {
    type: String,
    enum: ["user", "company"],
    default: "company",
  },
});

//   exporting the user schema
module.exports = mongoose.model("Company", companySchema);
