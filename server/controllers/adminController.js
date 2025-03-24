const express = require("express");
const router = express.Router();
const Course = require('../models/Course')

router.post("/add-course", async (req, res) => {
    try {
      const newCourse = new Course(req.body);
      await newCourse.save();
      res.status(201).json({ message: "Course added successfully!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;