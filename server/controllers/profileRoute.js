const express = require("express");
const User = require("../models/User");
const Student = require("../models/Student");
const Staff = require("../models/Staff");

const router = express.Router();

router.post("/complete-profile", async (req, res) => {
    try {
        const { uniqueId, role, name, profileData } = req.body;
        console.log(req.body);

        const user = await User.findOne({ uniqueId });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (role === "student") {
            await Student.create({ userID: uniqueId, name, ...profileData });
        } else if (role === "staff") {
            await Staff.create({ userID: uniqueId,name, ...profileData });
        } else {
            return res.status(400).json({ error: "Invalid role" });
        }

        await User.findOneAndUpdate({ uniqueId }, { $set: { isProfileComplete: true } }, { new: true });

        res.json({ message: "Profile completed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
