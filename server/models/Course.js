const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // e.g., "Computer Science"
    code: { type: String, required: true, unique: true }, // e.g., "CS101"
    semesters: [
        {
            semesterNumber: { type: Number, required: true }, // e.g., 1, 2, 3...
            subjects: [
                {
                    name: { type: String, required: true }, // Subject name
                    code: { type: String, required: true, unique: true } // Subject code (unique)
                }
            ]
        }
    ]
});

module.exports = mongoose.model("Course", courseSchema);
