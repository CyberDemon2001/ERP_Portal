const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    userID: { type: String, unique: true, required: true }, // Fixed: userID (uppercase D)
    name: { type: String, required: true,},
    fatherName: String,
    motherName: String,
    dob: String,
    contact: String,
    address: String,
    department: String,
    email: String
});

module.exports = mongoose.model("Student", studentSchema);
