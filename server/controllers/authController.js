const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Student = require("../models/Student");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { name, uniqueId, role, password } = req.body;

    if (!name || !uniqueId || !role || !password) {
      return res.status(400).json({ error: "All Fields are required" });
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
    });

    await newUser.save();
    console.log("User Created");

    res.status(201).json({ message: "Registered Successfully!" });
    console.log("Registered Successfully!");
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

    res.status(200).json({ message: "Login Successful!", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in!" });
  }
});

module.exports = router;
