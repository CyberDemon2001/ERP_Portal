const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Course = require("../models/Course");

// Get Student by ID
router.get("/profile/:userId", async (req, res) => {
    try {
        const student = await Student.findById(req.params.userId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Get subjects based on course and semester
router.get("/subjects/:course/:semester", async (req, res) => {
    try {
        const { course, semester } = req.params;
        console.log(req.params);
        
        const courseData = await Course.findOne({ name: { $regex: new RegExp(`^${course}$`, "i") } });


        if (!courseData) {
            return res.status(404).json({ message: "Course not found" });
        }

        const semesterData = courseData.semesters.find(sem => sem.semesterNumber == semester);

        if (!semesterData) {
            return res.status(404).json({ message: "Semester not found" });
        }

        res.json(semesterData.subjects);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.get("/students/subject/:code", async (req, res) => {
    const subjectCode = req.params.code;

    try {
        const students = await Student.find(
            { "subjects.code": subjectCode },
            { name: 1, uniqueId: 1, _id: 0 }
            );

        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
});


module.exports = router;
