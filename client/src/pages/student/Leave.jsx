import React, { useState, useEffect } from 'react';
import axios from "axios";

const LeaveApplicationForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    studentId: user.uniqueId,
    studentName: user.name,
    department: user.department,
    course: user.course,
    semester: user.semester,
    reason: '',
    startDay: '',
    endDay: '',
    daysRequested: 0,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to calculate days between startDay and endDay
  const calculateDays = () => {
    if (formData.startDay && formData.endDay) {
      const start = new Date(formData.startDay);
      const end = new Date(formData.endDay);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  // Update `daysRequested` whenever `startDay` or `endDay` changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      daysRequested: calculateDays()
    }));
  }, [formData.startDay, formData.endDay]);

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formData);

  try {
    const response = await axios.post("http://localhost:8080/api/leave-request", formData, 
    );
    

    if (response.status === 200 || response.status === 201) {
      alert("Leave request submitted successfully!");
      setFormData({
        studentId: user.uniqueId,
        studentName: user.name,
        // department: user.department,
        course: user.course,
        semester: user.semester,
        reason: '',
        startDay: '',
        endDay: '',
        daysRequested: 0,
        description: ''
      });
    } else {
      alert("Failed to submit leave request. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting leave request:", error);
    alert("An error occurred. Please try again later.");
  }
};


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Leave Application Form</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Please fill in the form below if you need to leave work. All leave applications need to be approved by both the applicant and the manager.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Reason for Leave</label>
          <div className="flex flex-col">
            <label><input type="radio" name="reason" value="Emergency Leave" onChange={handleChange} /> Emergency Leave</label>
            <label><input type="radio" name="reason" value="Annual Leave" onChange={handleChange} /> Annual Leave</label>
            <label><input type="radio" name="reason" value="Other" onChange={handleChange} /> Other</label>
          </div>
        </div>
        
        <div className="mb-4 flex space-x-2">
          <div className="w-1/2">
            <label className="block text-sm font-medium">First day of absence</label>
            <input type="date" name="startDay" className="border p-2 rounded w-full" onChange={handleChange} />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">Last day of absence</label>
            <input type="date" name="endDay" className="border p-2 rounded w-full" onChange={handleChange} />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">No. of days requested</label>
          <input type="number" value={formData.daysRequested} readOnly className="border p-2 rounded w-full bg-gray-100" />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Describe Your Reasons:</label>
          <textarea name="description" className="border p-2 rounded w-full" onChange={handleChange}></textarea>
        </div>
        
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">SEND REQUEST</button>
      </form>
    </div>
  );
};

export default LeaveApplicationForm;
