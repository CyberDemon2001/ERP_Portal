import React from 'react'
import { useState } from "react";

const register = () => {
  const [formData, setFormData]=useState({
    name:"",
    ID:"",
    role:"student",
  });

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value });
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault();

    const userData={...formData};
    console.log(userData);

    try{
        const response = await axios.post("http://localhost:5000/api/register", userData);
        alert(response.data, "Registration Successfull");
    }
    catch(error){
        console.error("Error in Registration", error);
        alert(error.response?.data?.error || "Registration Failed");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Regsitration</h1>
        <label>ID</label>
        <input 
        type="text"
        name="ID"
        value={formData.ID}
        onChange={handleChange}
        required
        />

        <label>Name:</label>
        <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        />

<label className="block mt-2 mb-2">Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default register
