const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "staff"],
    },
    password:
    {
        type: String,
        required: true,
    },
    isProfileComplete: { type: Boolean, default: false }
    
    // },
    // course: {
    //   type: String,
    //   required: true,
    // },
    // category: {
    //   type: String,
    //   required: true,
    // },
    // admittedYear: {
    //   type: String,
    //   required: true,
    // },
    // fatherName: {
    //   type: String,
    //   required: true,
    // },
    // motherName: {
    //   type: String,
    //   required: true,
    // },
    // dateOfBirth: {
    //   type: String,
    //   required: true,
    // },
    // email:{
    //   type: String,
    //   required: true,
    // },
    // city: {
    //   type: String,
    //   required: true,
    // },
    // phone: {
    //   type: String,
    //   required: true,
    // }

}, { timestamps: true })

const User = mongoose.model("User", userSchema);
module.exports = User;
