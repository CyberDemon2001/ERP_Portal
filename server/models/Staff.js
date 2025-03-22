const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    uniqueId: { type: String, unique: true, required: true },
    name: String,
    fatherName: String,
    motherName: String,
    dob: String,
    contact: String,
    address: String,
    department: String,
    designation: String,
    email: String
});

module.exports = mongoose.model("Staff", staffSchema);
