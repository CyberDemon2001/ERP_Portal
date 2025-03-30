const mongoose = require('mongoose');
const schema = mongoose.Schema;

const leaveSchema = new schema({
    studentID: { type: String, required: true },
    studentName: { type: String, required: true },
    department: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: Number, required: true },
    daysRequested: { type: Number, required: true },
    startDay: { type: Date, required: true },
    endDay: { type: Date, required: true },
    reason: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
