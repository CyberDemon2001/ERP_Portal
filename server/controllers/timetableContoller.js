const express = require("express");
const Timetable = require("../models/Timetable");
const router = express.Router();

router.post("/create-timetable", async (req, res) => {
    try {
        const { course, semester, schedule } = req.body;

        const newTimetable = new Timetable({ course, semester, schedule });
        await newTimetable.save();

        res.status(201).json({ message: "Timetable created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error creating timetable" });
    }
});

module.exports = router;
