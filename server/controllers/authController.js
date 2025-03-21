const bcrypt = require('bcrypt');
const User = require('../models/User')

const Signup = async (req, res) => {
  try{
    console.log(req.body);
    const {name, uniqueId,course,category,admittedYear,fatherName,motherName,dateOfBirth,email,city,phone, role, password} = req.body;

    if(!name || !uniqueId || !role || !password){
      return res.status(400).json({error:"All Fields are required"});
      console.log("All Fields are required");
    }
    
    const existingUser = await User.findOne({uniqueId});
    if(existingUser){
      return res.status(400).json({error:"Already Exist in DB"});
      console.log("Already Exist in DB");
    }


    const hashedPassword = await bcrypt.hash(password,10)
    console.log("Hashed Password");

    const newUser = new User({
        uniqueId,
        name,
        course,
        category,
        admittedYear,
        fatherName,
        motherName,
        dateOfBirth,
        email,
        city,
        phone,
        role,
        password: hashedPassword,
    })

    await newUser.save();
    res.status(201).json({message:"Registered Successfully!"});
    console.log("Registered Successfully!");
  }
  catch(error){
    res.status(500).json({error:"Error registering"})
    console.log("Error registering");
  }
}

const Login = async (req,res)=>{
    try{
      const {uniqueId, password} = req.body;
      const user =await User.findOne({uniqueId});
      console.log(user);
      if(!user){
        return res.status(404).json({error:"User not found!"});
        console.log("User not found!");
      }
      const isPAsswordCorrect = await bcrypt.compare(password,user.password);
      if(!isPAsswordCorrect){
        return res.status(400).json({error:"Invalid Credentials!"});
        console.log("Invalid Credentials!");
      }

      res.status(200).json({message:"Login Successful!",user});
      console.log("Login Successful!");

    }catch(error){
      res.status(500).json({error:"Error logging in!"});
      console.log("Error logging in!");
    }
};

module.exports={Signup,Login};