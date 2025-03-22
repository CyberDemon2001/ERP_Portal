const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Get Student by ID
router.get("/profile") = async (req, res) => {
    try {
        const student = await Student.findById(req.params.userId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


router.get("/:userId", getStudentById);


module.exports = router;
