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

module.exports={Signup};