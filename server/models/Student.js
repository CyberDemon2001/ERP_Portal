const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    uniqueId: { type: String, unique: true, required: true }, // Fixed: userID (uppercase D)
    name: { type: String, required: true,},
    fatherName: String,
    motherName: String,
    dob: String,
    contact: String,
    address: String,
    department: String,
    email: String,
    course: { type: String, default: "Not specified" },  // Added course field
    semester: { type: String, default: "Not specified" }, 
    subjects: [{
        name: { type: String, default: "none" },
        code: { type: String, default: "00" },
    }],
});

module.exports = mongoose.model("Student", studentSchema);
