const express = require("express");
const router = express.Router();
const Course = require('../models/Course')
const Staff = require('../models/Staff')

router.post("/add-course", async (req, res) => {
    try {
      const newCourse = new Course(req.body);
      await newCourse.save();
      res.status(201).json({ message: "Course added successfully!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/view-courses", async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  router.post("/assign-coordinator", async (req, res) => {
    const { uniqueId, courseName } = req.body;
    console.log(req.body);
  
    try {
      // Check if the course already has a coordinator
      const existingCoordinator = await Staff.findOne({ coordinatorFor: courseName });
  
      if (existingCoordinator) {
        return res.status(400).json({ message: "This course already has a coordinator." });
      }
  
      // Assign the staff member as the course coordinator
      await Staff.findOneAndUpdate({uniqueId: uniqueId}, { coordinatorFor: courseName },{ new: true });
  
      res.json({ message: `Coordinator assigned for course: ${courseName}` });
    } catch (error) {
      res.status(500).json({ message: "Failed to assign coordinator." });
    }
  });

  router.get("/view-coordinators", async (req,res)=>{
    try{
        const coordinators = await Staff.find({coordinatorFor: { $ne: null } });
        if(!coordinators) return res.status(404).json({message: "No coordinators found"});
        res.json(coordinators);
    }
    catch(err){
      res.status(500).json({message: "Error fetching coordinators", error: err});
    }
  })
  

module.exports = router;