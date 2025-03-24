import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const uniqueId = user?.uniqueId;

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!uniqueId) {
                setError("User not found!");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8080/api/profile/${uniqueId}`);
                setProfileData(response.data);
            } catch (err) {
                setError("Failed to fetch profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [uniqueId]);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [editingField]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/api/profile/${uniqueId}`, {
                [editingField]: profileData[editingField],
            });
            alert("Profile updated successfully!");
            setEditingField(null);
        } catch (err) {
            alert("Failed to update profile!");
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Profile Details</h2>
            <div className="space-y-4">
                {Object.entries(profileData).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center border-b pb-2">
                        <p><strong>{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</strong></p>
                        {editingField === key ? (
                            <input
                                type="text"
                                name={key}
                                value={value}
                                onChange={handleChange}
                                className="border px-2 py-1 rounded"
                            />
                        ) : (
                            (key === "name" || key === "uniqueId") ? (
                                <p>{value}</p> // Display as text for name and uniqueId
                            ) : (
                                <p>{value}</p>
                            )
                        )}
                        <div className="flex space-x-2">
                            {editingField === key ? (
                                <>
                                    <i
                                        className="fa-solid fa-check text-green-500 cursor-pointer"
                                        onClick={handleSave}
                                    ></i>
                                    <i
                                        className="fa-solid fa-times text-red-500 cursor-pointer"
                                        onClick={() => setEditingField(null)}
                                    ></i>
                                </>
                            ) : (
                                (key !== "name" && key !== "uniqueId") && ( // Allow editing for other fields only
                                    <i
                                        className="fa-solid fa-pencil text-blue-500 cursor-pointer"
                                        onClick={() => setEditingField(key)}
                                    ></i>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
