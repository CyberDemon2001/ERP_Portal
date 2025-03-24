import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileCompletion = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const uniqueId = user?.uniqueId;
    const name = user?.name;
    const role = user?.role; 

    const [formData, setFormData] = useState({
        fatherName: "",
        motherName: "",
        dob: "",
        contact: "",
        address: "",
        department: "",
        email: ""
    });

    useEffect(() => {
        const checkProfile = async () => {
            if (!uniqueId) return;
            try {
                const response = await axios.get(`http://localhost:8080/api/check-profile/${uniqueId}`);
                if (response.data.isProfileComplete) {
                    console.log(response.data.isProfileComplete);
                }
            } catch (error) {
                console.error("Error checking profile:", error.response ? error.response.data : error.message);
            }
        };
    
        checkProfile();
    }, [uniqueId, navigate]);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/complete-profile", {
                uniqueId,
                name,
                role,
                profileData: formData
            });
    
            if (response.data.isProfileComplete) {
                const updatedUser = { ...user, isProfileComplete: true };
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
    
            alert("Profile saved successfully!");
            
            // Navigate based on role
            if (role === "staff") {
                navigate(`/staff/${uniqueId}/profile`);
            } else {
                navigate(`/student/${uniqueId}/profile`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };
    

    return (
        <div className="flex items-center justify-center h-[80vh] bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Complete Your Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {[ 
                            { label: "Father Name", name: "fatherName", type: "text" },
                            { label: "Mother Name", name: "motherName", type: "text" },
                            { label: "Date of Birth", name: "dob", type: "date" },
                            { label: "Contact", name: "contact", type: "text" },
                            { label: "Address", name: "address", type: "text" },
                            { label: "Department", name: "department", type: "text" },
                            { label: "Email", name: "email", type: "email" }
                        ].map(({ label, name, type }) => (
                            <div key={name}>
                                <label className="block text-gray-700 font-medium">{label}</label>
                                <input 
                                    type={type} 
                                    name={name} 
                                    value={formData[name]} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600 transition">
                        Complete Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProfileCompletion
