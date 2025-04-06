const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Student = require("../models/Student");
const router = express.Router();
const jwt = require("jsonwebtoken");

const SECRET_KEY = "12345";

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { name, uniqueId, role, password, course, semester, department } = req.body;

    if (!name || !uniqueId || !role) {
      return res.status(400).json({ error: "Name, ID, and Role are required" });
    }

    if (role === "student" && (!course || !semester || !department)) {
      return res.status(400).json({ error: "Course, Semester, and Department are required for students" });
    }

    const existingUser = await User.findOne({ uniqueId });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      uniqueId,
      name,
      role,
      password: hashedPassword,
      ...(role === "student" && { course, semester, department }), // Only add these fields for students
    });

    await newUser.save();
    console.log("User Created");

    res.status(201).json({ message: "Registered Successfully!" });
  } catch (error) {
    console.error("Error registering:", error);
    res.status(500).json({ error: "Error registering" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { uniqueId, password } = req.body;
    const user = await User.findOne({ uniqueId });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }

    const token = jwt.sign({uniqueId: user.uniqueId, name:user.name, role: user.role, isProfileComplete: user.isProfileComplete, course: user.course, semester: user.semester}, SECRET_KEY, { expiresIn: "1h"})
    res.status(200).json({ message: "Login Successful!", token});

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in!" });
  }
});

module.exports = router;
