const mongoose = require("mongoose");

// const attendanceSchema = new mongoose.Schema({
//   subject_code: { type: String, required: true, unique: true },
//   subject_name: { type: String, required: true },
//   teacher: {
//     staff_id: { type:String, required: true },
//     staff_name: { type: String, required: true }
//   },
//   students: [
//     {
//       student_id: { type: String, required: true },
//       name: { type: String, required: true },
//       attendance: [
//         {
//           date: { type: Date, required: true },
//           status: { type: String, enum: ["present", "absent"], required: true }
//         }
//       ]
//     }
//   ]
// }, { timestamps: true });

// module.exports = mongoose.model("Subject", SubjectSchema);
const attendanceSchema = new mongoose.Schema({
  student_id: String,
  subject_code: String,
  date: Date,
  status: { type: String, enum: ["present", "absent"], required: true },
  marked_by: String // staff ID
});

attendanceSchema.index({ student_id: 1, subject_code: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
