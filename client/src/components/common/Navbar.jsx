import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const links = {
        student: [
            { path: "profile", label: "Profile" },
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
            { path: "assignment", label: "Assignments" },
            { path: "problem-solving", label: "Problem Solving" },
        ],
        staff: [
            { path: "profile", label: "Profile" },
            { path: "mark-attendance", label: "Manage Attendance" },
            { path: "grades", label: "Manage Grades" },
            { path: "leave-requests", label: "Leave Requests" },
            { path: "students", label: "Student Management" },
            { path: "library", label: "Library Requests" },
            { path: "events", label: "Event Management" },
            
        ]
    };

    return (
        <nav className="bg-orange-500 text-white h-[20vh] flex flex-col">
    {/* Header Section */}
    <div className="flex justify-between items-center py-4 px-6 h-[70%]">
        <h1 className="text-2xl font-bold">College ERP Portal</h1>
        <button className='cursor-pointer underline' onClick={()=>navigate("/admin")}>Admin</button>
        {user && (
            <div className='flex items-center gap-6'>
                <div>
                    <h1 className='text-lg font-semibold uppercase'>{user.name}</h1>
                    <h1 className='uppercase font-semibold text-gray-800 text-sm'>{user.role}</h1>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="cursor-pointer text-center border-2 rounded-full px-3 py-1 bg-red-600 hover:bg-red-700 text-sm"
                >
                    Logout
                </button>
            </div>
        )}
    </div>

    {/* Navigation Links */}
    {user && (
        <ul className="flex w-full bg-blue-500 text-white h-[30%] overflow-x-auto">
            {links[user.role]?.map(({ path, label }) => (
                <li key={path} className="flex-grow text-center py-3 hover:bg-orange-600">
                    <Link to={`/${user.role}/${user.uniqueId}/${path}`} className="block w-full text-sm">{label}</Link>
                </li>
            ))}
        </ul>
    )}
</nav>
    );
};

export default Navbar;
