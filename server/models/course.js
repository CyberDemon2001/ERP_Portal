const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    duration: { type: String, required: true, trim: true },
    semesters: [
      {
        name: { type: String, required: true, trim: true },
        subjects: [
          {
            name: { type: String, required: true, trim: true },
            code: { type: String, required: true, trim: true },
            type: {
              type: String,
              required: true,
              enum: ["core", "elective"],
              trim: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;