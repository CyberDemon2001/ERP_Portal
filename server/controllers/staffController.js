const express = require("express");
const Staff = require("../models/Staff");
const router = express.Router();

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

module.exports = router;