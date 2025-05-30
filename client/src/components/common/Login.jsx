import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
 

  const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/login", {
                uniqueId,
                password
            });
      const {token} = response.data;
      const decodeUser = jwtDecode(token); 
      localStorage.setItem('user', JSON.stringify(decodeUser));
      setRole(decodeUser.role);
      
      alert("Login Successful!");
        if (decodeUser.isProfileComplete) {
          navigate(`/${decodeUser.role}/${decodeUser.uniqueId}/profile`);
        } else {
          navigate(`/${decodeUser.role}/${decodeUser.uniqueId}/profile-completion`);
        }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-semibold">
              Enrollment Number/Unique ID:
            </label>
            <input
              type="text"
              name="uniqueId"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-semibold">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
        {role && (
          <h2 className="text-center text-green-600 font-semibold mt-4">
            Role: {role}
          </h2>
        )}
        
      </div>
    </div>
  );
};

export default Login;
