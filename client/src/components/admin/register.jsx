import React from 'react'
import { useState } from "react";
import axios from "axios";

const register = () => {
  const [formData, setFormData]=useState({
    name:"",
    uniqueId:"",
    role:"student",
  });

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value });
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault();

    const firstName = formData.name.split(" ")[0].toLowerCase();
    const idDigits = formData.uniqueId.replace(/\D/g, "");
    const password = `${firstName}${idDigits}`;

    const userData={...formData, password};
    console.log(userData);

    try{
        const response = await axios.post("http://localhost:8080/api/register", userData);
        alert(response.data.message);
    }
    catch(error){
        console.error(error);
        // alert(error.response?.data?.error || "Registration Failed");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Regsitration</h1>
        <label>ID</label>
        <input 
        type="text"
        name="uniqueId"
        value={formData.uniqueId}
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
