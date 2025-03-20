require('dotenv').config();
const express=require('express');
const mongoose= require('mongoose');
const cors = require('cors');
const { Signup } = require('./controllers/authController');
const app=express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const MONGO_URI=process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is not defined!");
    process.exit(1);
  }

mongoose.connect(MONGO_URI, {})
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});

app.use('/api/register',Signup);
app.use("/api/login",Login);

app.get('/',(req,res)=>{
    res.send('Hello World');
});

