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
    isProfileComplete: { type: Boolean, default: false },
    course: { type: String },
    semester: { type: String },
    department :{ type: String },

}, { timestamps: true })

const User = mongoose.model("User", userSchema);
module.exports = User;
