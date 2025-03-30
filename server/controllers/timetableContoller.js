const express = require("express");
const Timetable = require("../models/Timetable");
const router = express.Router();

router.post("/create-timetable", async (req, res) => {
    try {
        const { course, semester, schedule } = req.body;

        // Check if a timetable for the given course and semester already exists
        const existingTimetable = await Timetable.findOne({ course, semester });

        if (existingTimetable) {
            // Update the existing timetable instead of creating a new one
            existingTimetable.schedule = schedule;
            await existingTimetable.save();
            
            return res.status(200).json({ message: "Timetable updated successfully" });
        }

        // If no existing timetable, create a new one
        const newTimetable = new Timetable({ course, semester, schedule });
        await newTimetable.save();

        res.status(201).json({ message: "Timetable created successfully" });
    } catch (error) {
        console.error("Error creating/updating timetable:", error);
        res.status(500).json({ error: "Error creating/updating timetable" });
    }
});


router.get("/timetable/:course/:semester", async (req, res) => {
    try {
        const { course, semester } = req.params;
        const timetable = await Timetable.findOne({ course, semester })
        
        if (!timetable) {
            return res.status(404).json({ message: "Timetable not found" });
        }
        res.json(timetable);
        // console.log(timetable);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
