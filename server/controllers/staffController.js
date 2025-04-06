const express = require("express");
const Staff = require("../models/Staff");
const router = express.Router();
const Attendance = require("../models/attendence");
const Leaves = require("../models/Leaves");

router.get("/staff", async (req, res) => {
    try {
        const staff = await Staff.find();
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: "Error fetching staff", error });
    }
});

router.get("/staff/:uniqueId", async(req,res)=>{
    const {uniqueId} = req.params;
    console.log(req.params);
    try{
        const staff = await Staff.findOne({uniqueId});
        if(!staff) return res.status(404).json({message: "Staff not found"});
        res.json(staff);
    }
    catch(error){
        res.status(500).json({message: "Error fetching staff", error});

    }
})

//mark atttandance
router.post("/attendance", async (req, res) => {
    const { subjectCode, presentStudents, allStudents, markedBy } = req.body;
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD only
  
    try {
      const attendanceData = allStudents.map(student => ({
        student_id: student.uniqueId,
        subject_code: subjectCode,
        date: today,
        status: presentStudents.some(p => p.uniqueId === student.uniqueId) ? "present" : "absent",
        marked_by: markedBy,
      }));
  
      // Insert many, ignoring duplicates due to the unique index
      await Attendance.insertMany(attendanceData, { ordered: false });
  
      res.status(201).json({ message: "Attendance marked successfully" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "Attendance already marked for today." });
      }
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  //find leaves
  router.get("/leaves/:courseName", async(req, res) => {
    const courseName = req.params.courseName;
    try {
        const leaves = await Leaves.find({ course: courseName }).select("-_id -__v");
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leaves", error });
    }
})

router.get("/coordinator/:uniqueId", async (req, res) => {
    const {uniqueId} = req.params;
    try {
        const staff = await Staff.findOne({uniqueId}).select("coordinatorFor -_id");
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coordinators", error });
    }
});

module.exports = router;