import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const uniqueId = user?.uniqueId;
    const role = user?.role;

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!uniqueId) {
                setError("User not found!");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8080/api/profile/${uniqueId}`);
                const { _id, __v, ...filteredData } = response.data; // Remove _id and __v
                setProfileData(filteredData);
                if (role === "student") {
                    fetchSubjects(filteredData.course, filteredData.semester);
                }
            } catch (err) {
                setError("Failed to fetch profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [uniqueId, role]);

    const fetchSubjects = async (course, semester) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/subjects/${course}/${semester}`);
            setSubjects(response.data);
        } catch (err) {
            console.error("Failed to fetch subjects", err);
        }
    };

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

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const fieldOrder = ["name", "course", "semester", "department", "fatherName", "motherName", "dob", "contact", "address", "email"];

    return (
        <div className="max-w-3xl mx-auto p-6 h-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Profile Details</h2>
            <div className="space-y-4">
                {fieldOrder.map((key) => (
                    profileData[key] !== undefined && (
                        <div key={key} className="flex uppercase justify-between items-center border-b pb-3">
                            <p className="text-gray-700 font-semibold">{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</p>
                            {editingField === key ? (
                                <input
                                    type="text"
                                    name={key}
                                    value={profileData[key]}
                                    onChange={handleChange}
                                    className="border border-gray-300 px-3 py-1.5 rounded-md w-2/3 focus:ring focus:ring-blue-200 outline-none"
                                    disabled={key === "course" || key === "semester" || key === "name" || key === "department"}
                                />
                            ) : (
                                <p className="text-gray-800">{profileData[key]}</p>
                            )}
                            <div className="flex space-x-3">
                                {editingField === key ? (
                                    <>
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                            onClick={() => setEditingField(null)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    key !== "course" && key !== "semester" && key !== "name" && key !== "department" && (
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                            onClick={() => setEditingField(key)}
                                        >
                                            Edit
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    )
                ))}
            </div>
            {role === "student" && (
                <>
                    <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">Subjects</h3>
                    {subjects.length > 0 ? (
                        <ul className="list-disc pl-5 text-gray-700">
                            {subjects.map((subject, index) => (
                                <li key={index} className="py-1">
                                    <span className="font-semibold">{subject.name} ({subject.code})</span> - <span className="text-blue-600 uppercase">{subject.type}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No subjects found</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Profile;
