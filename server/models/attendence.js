const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  subject_code: { type: String, required: true, unique: true },
  subject_name: { type: String, required: true },
  teacher: {
    staff_id: { type:String, required: true },
    staff_name: { type: String, required: true }
  },
  students: [
    {
      student_id: { type: String, required: true },
      name: { type: String, required: true },
      attendance: [
        {
          date: { type: Date, required: true },
          status: { type: String, enum: ["present", "absent"], required: true }
        }
      ]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Subject", SubjectSchema);
