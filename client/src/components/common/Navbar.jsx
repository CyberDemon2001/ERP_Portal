import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return null;

    const { uniqueId, role } = user;

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const links = {
        student: [
            { path: "", label: "Profile" },
            { path: "attendance", label: "Attendance" },
            { path: "timetable", label: "Time Table" },
            { path: "datesheet", label: "Date Sheet" },
            { path: "result", label: "Result" },
            { path: "fee-status", label: "Fee Status" },
            { path: "library", label: "Library" },
            { path: "feedback", label: "Feedback" },
            { path: "leave", label: "Apply for Leave" },
            { path: "placement", label: "Placement" },
            { path: "events", label: "Events" },
            { path: "semester-registration", label: "Semester Registration" },
            { path: "assignment", label: "Assignments" },
            { path: "problem-solving", label: "Problem Solving" },
        ],
        staff: [
            { path: "", label: "Profile" },
            { path: "attendance", label: "Manage Attendance" },
            { path: "timetable", label: "Set Time Table" },
            { path: "grades", label: "Manage Grades" },
            { path: "leave-requests", label: "Leave Requests" },
            { path: "students", label: "Student Management" },
            { path: "library", label: "Library Requests" },
            { path: "events", label: "Event Management" },
        ]
    };

    return (
        <nav className="bg-orange-500 text-white">
            {/* Header Section */}
            <div className="flex justify-between items-center py-4 px-6">
                <h1 className="text-3xl font-bold">ERP Portal</h1>
                <div className='flex gap-5'>
                <div className="h-12 w-12 flex items-center justify-center border-white border-2 rounded-full">
                    Logo
                </div>
                                {/* Logout Button */}
                                <div className="text-center py-2 hover:bg-red-600 cursor-pointer">
                    <button onClick={handleLogout} className="w-full">Logout</button>
                </div>
                </div>
            </div>

            {/* Navigation Links */}
            <ul className="flex w-full bg-blue-500 text-white">
                {links[role]?.map(({ path, label }) => (
                    <li key={path} className="flex-grow text-center py-3 hover:bg-orange-600">
                        <Link to={`/${role}/${uniqueId}/${path}`} className="block w-full">{label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
