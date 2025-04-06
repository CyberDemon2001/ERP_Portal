import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;
    const uniqueId = user?.uniqueId;

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

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

                if (role === "student") {
                    fetchSubjects(response.data.course, response.data.semester);
                    setSelectedSubjects(response.data.subjects || []);
                } else if (role === "staff" && response.data.subjects) {
                    setSubjects(response.data.subjects);
                    localStorage.setItem("user", JSON.stringify({ ...user, subjects: response.data.subjects, coordinatorFor: response.data.coordinatorFor }));
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

    const removeSubject = (code) => {
        setSelectedSubjects(selectedSubjects.filter((s) => s.code !== code));
    };

    const handleSubmitSubjects = async () => {
        try {
            await axios.put(`http://localhost:8080/api/profile/${uniqueId}`, {
                subjects: selectedSubjects,
            });
            alert("Subjects updated successfully!");
            console.log("Selected subjects:", selectedSubjects);
        } catch (err) {
            console.error(err);
            alert("Failed to update subjects.");
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const studentFields = ["name", "course", "semester", "department", "fatherName", "motherName", "dob", "contact", "address", "email"];
    const staffFields = ["uniqueId", "name", "coordinatorFor", "fatherName", "motherName", "dob", "contact", "email", "address"];
    const fieldOrder = role === "student" ? studentFields : staffFields;

    return (
        <div className="max-w-3xl mx-auto p-6 h-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Profile Details</h2>
            <div className="space-y-4">
                {fieldOrder.map((key) => (
                    profileData[key] !== undefined && (
                        <div key={key} className="flex uppercase justify-between items-center border-b pb-3">
                            <p className="text-gray-700 font-semibold">
                                {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                            </p>
                            {editingField === key ? (
                                <input
                                    type="text"
                                    name={key}
                                    value={profileData[key]}
                                    onChange={handleChange}
                                    className="border border-gray-300 px-3 py-1.5 rounded-md w-2/3 focus:ring focus:ring-blue-200 outline-none"
                                    disabled={["course", "semester", "name", "department", "uniqueId", "coordinatorFor"].includes(key)}
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
                                    !["course", "semester", "name", "department", "uniqueId", "coordinatorFor", "subjects"].includes(key) && (
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

            {/* Subject Section for Students */}
            {role === "student" && (
                <div className="mt-4">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-800">Select Subjects</h3>
                    <div className=" md:grid-cols-3 gap-4">
                        {subjects.map((sub) => {
                            const isSelected = selectedSubjects.find((s) => s.code === sub.code);
                            return (
                                <label
                                    key={sub.code}
                                    className="flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-blue-50"
                                >
                                    <input
                                        type="checkbox"
                                        checked={!!isSelected}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                if (selectedSubjects.length < 6) {
                                                    setSelectedSubjects((prev) => [...prev, sub]);
                                                } else {
                                                    alert("You can select up to 6 subjects only.");
                                                }
                                            } else {
                                                removeSubject(sub.code);
                                            }
                                        }}
                                    />
                                    <span className="text-gray-800 uppercase">
                                        {sub.name} ({sub.code}) - {sub.type}
                                    </span>
                                </label>
                            );
                        })}
                    </div>                    

                    <button
                        onClick={handleSubmitSubjects}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Submit Subjects
                    </button>
                </div>
            )}
            {role === "staff" && subjects.length > 0 && (
    <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">Subjects Allotted To You</h3>
        <div className="space-y-2">
            {subjects.map((sub) => (
                <div key={sub.code} className="bg-gray-100 p-3 rounded-md shadow-sm">
                    <p className="text-gray-800 font-medium uppercase">
                        {sub.name} ({sub.code})
                    </p>
                </div>
            ))}
        </div>
    </div>
)}
        </div>
    );
};

export default Profile;
