const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({
    course: { type: String, required: true },
    semester: { type: String, required: true },
    schedule: {
        type: Map,
        of: {
            type: Map,
            of: {
                subject: { type: String, required: true },
                faculty: { type: String, required: true },
                room: { type: String }
            }
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Timetable", TimetableSchema);
