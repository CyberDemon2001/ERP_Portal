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

module.exports = router;