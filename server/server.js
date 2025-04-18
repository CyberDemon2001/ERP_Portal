require('dotenv').config();
const express=require('express');
const mongoose= require('mongoose');
const cors = require('cors');
const authController = require('./controllers/authController');
const profileRoute = require('./controllers/profileRoute');
const adminController = require('./controllers/adminController')
const studentRoutes = require('./controllers/studentRoutes');
const timetableController = require('./controllers/timetableContoller');
const staffController = require('./controllers/staffController');
const leaveController  = require('./controllers/leaveController');
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

app.use("/api",authController,profileRoute,adminController,studentRoutes,timetableController,staffController,leaveController);
// app.use("/api",profileRoute);  
// app.use("/api",adminController); 
// app.use("/api",studentRoutes); 
// app.use("/api",timetableController);
// app.use("/api", staffController);
// app.use("/api", leaveController);

app.get('/',(req,res)=>{
    res.send('Hello World');
});

