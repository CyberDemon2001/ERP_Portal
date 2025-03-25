const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({
    course: { type: String, required: true },
    semester: { type: String, required: true },
    schedule: {
        type: Map,
        of: {
            type: Map,
            of: {
                subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
                faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
                room: { type: String }
            }
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Timetable", TimetableSchema);
