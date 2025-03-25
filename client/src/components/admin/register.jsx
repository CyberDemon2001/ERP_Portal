import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    uniqueId: "",
    role: "student",
    course: "",
    semester: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = formData.name.split(" ")[0].toLowerCase();
    const idDigits = formData.uniqueId.replace(/\D/g, "");
    const password = `${firstName}${idDigits}`;
    const userData = { ...formData, password };
    console.log(userData);

    try {
      const response = await axios.post("http://localhost:8080/api/register", userData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Registration</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">ID</label>
              <input
                type="text"
                name="uniqueId"
                value={formData.uniqueId}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div>
            <label className="block text-gray-700 font-medium mb-1">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              ></input>
              <label className="block text-gray-700 font-medium mb-1">Semester</label>
              <input
                type="Number"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              ></input>
              <label className="block text-gray-700 font-medium mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </select>
              
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
