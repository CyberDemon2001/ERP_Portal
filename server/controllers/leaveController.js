const express = require('express');
const Leave = require('../models/Leaves');

const router = express.Router();

router.post("/leave-request", async(req,res)=>{
    const {studentId, studentName, department, course, semester, daysRequested, startDay, endDay, reason, description} = req.body;
    
    if (!studentId || !studentName || !department || !course || !semester || !startDay || !endDay || !reason) {
        return res.status(400).json({ error: "All required fields must be filled" });
    }

    const existingLeave = await Leave.findOne({ studentID: studentId, status: 'pending' });
    if (existingLeave) {
        return res.status(400).json({error:"already apply"});
    }

    console.log(req.body);
    try{
        const leave = new Leave({
            studentID: studentId,
            studentName: studentName,
            department: department,
            course: course,
            semester: semester,
            daysRequested: daysRequested,
            startDay: startDay,
            endDay: endDay,
            reason: reason,
            description: description,
        })
        await leave.save();
        res.status(201).json({message: "Leave application submitted successfully!"});
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;