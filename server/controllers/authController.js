const bcrypt = require('bcrypt');
const User = require('../models/User')

const Signup = async (req, res) => {
  try{
    console.log(req.body);
    const {name, uniqueId, role, password} = req.body;

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = new User({
        uniqueId,
        name,
        role,
        password: hashedPassword,
    })

    await newUser.save();
    res.status(201).json({message:"Registered Successfully!"});
  }
  catch(error){
    res.status(500).json({error:"Error registering"})
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
      console.log(user);
      console.log("Login Successful!");

    }catch(error){
      res.status(500).json({error:"Error logging in!"});
      console.log("Error logging in!");
    }
};

module.exports={Signup,Login};