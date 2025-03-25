const express = require("express");
const User = require("../models/User");
const Student = require("../models/Student");
const Staff = require("../models/Staff");

const router = express.Router();

router.get("/check-profile/:uniqueId", async (req, res) => {
    try {
        const user = await User.findOne({ uniqueId: req.params.uniqueId });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.isProfileComplete) {
            const student = await Student.findOne({ uniqueId: req.params.uniqueId });
            res.json({ isProfileComplete: true, profileData: student });
        } else {
            res.json({ isProfileComplete: false });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/complete-profile", async (req, res) => {
    try {
        const { uniqueId, name, role, profileData, } = req.body;

        // Check if all required fields are filled
        const requiredFields = ["fatherName", "motherName", "dob", "contact", "address", "department", "email"];
        const isComplete = requiredFields.every(field => profileData[field]?.trim());

        let existingProfile;

        if (role === "student") {
            existingProfile = await Student.findOne({ uniqueId });
            if (existingProfile) {
                await Student.findOneAndUpdate({ uniqueId }, profileData);
            } else {
                const newProfile = new Student({ uniqueId, name, ...profileData });
                await newProfile.save();
            }
        } else if (role === "staff") {
            existingProfile = await Staff.findOne({ uniqueId });
            if (existingProfile) {
                await Staff.findOneAndUpdate({ uniqueId }, profileData);
            } else {
                const newProfile = new Staff({ uniqueId, name, ...profileData });
                await newProfile.save();
            }
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        await User.findOneAndUpdate({ uniqueId: uniqueId }, { isProfileComplete: isComplete });

        res.json({ message: "Profile saved successfully!", isProfileComplete: isComplete });
    } catch (error) {
        res.status(500).json({ message: "Error saving profile" });
    }
});

router.get("/profile/:uniqueId", async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const user = await User.findOne({ uniqueId });

        if (!user) return res.status(404).json({ message: "User not found!" });

        let profile;
        if (user.role === "student") {
            profile = await Student.findOne({ uniqueId });
        } else if (user.role === "staff") {
            profile = await Staff.findOne({ uniqueId });
        }

        if (!profile) return res.status(404).json({ message: "Profile not found!" });

        res.status(200).json({
            ...profile.toObject(),
            course: user.course,     // Include course from User schema
            semester: user.semester, // Include semester from User schema
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching profile", error });
    }
});

router.put("/profile/:uniqueId", async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const updatedData = req.body;

        // Find the user to determine their role
        const user = await User.findOne({ uniqueId });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        let updatedProfile;

        // Update profile based on role
        if (user.role === "student") {
            updatedProfile = await Student.findOneAndUpdate(
                { uniqueId },
                updatedData,
                { new: true }
            );
        } else if (user.role === "staff") {
            updatedProfile = await Staff.findOneAndUpdate(
                { uniqueId },
                updatedData,
                { new: true }
            );
        } else {
            return res.status(400).json({ message: "Invalid role!" });
        }

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found!" });
        }

        res.status(200).json({ message: "Profile updated successfully!", updatedProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating profile", error });
    }
});




module.exports = router;
