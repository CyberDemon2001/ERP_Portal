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
    email: String,
    subjects: {
        type: [
            {
                name: { type: String, required: true },
                code: { type: String, required: true }
            }
        ],
        default: []
    },
    coordinatorFor: {
        type: String, 
        unique: true, // Ensures only one coordinator exists per course
        default: null, 
        sparse: true  // Allows multiple staff members to have NULL in this field
    }
});

module.exports = mongoose.model("Staff", staffSchema);
