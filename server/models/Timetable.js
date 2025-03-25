const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        required: true
    },
    schedule: [
        {
            lecture: {
                type: Number,
                required: true
            },
            subject: {
                type: String,
                required: true
            },
            subjectCode: {
                type: String,
                required: true
            },
            faculty: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Staff", // This links to the Staff collection
                required: true
            },
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            },
            roomNumber: {
                type: String,
                required: true
            }
        }
    ]
});

const Timetable = mongoose.model("Timetable", TimetableSchema);
module.exports = Timetable;
