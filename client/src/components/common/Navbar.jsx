<<<<<<< HEAD
import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">My App</h1>
                <button 
                    className="text-white md:hidden block" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
                <ul className={`md:flex space-x-6 md:space-x-4 absolute md:static bg-blue-600 w-full md:w-auto left-0 top-16 md:top-auto ${isOpen ? 'block' : 'hidden'}`}>
                    <li className="text-white py-2 px-4 hover:bg-blue-700 cursor-pointer">Home</li>
                    <li className="text-white py-2 px-4 hover:bg-blue-700 cursor-pointer">About</li>
                    <li className="text-white py-2 px-4 hover:bg-blue-700 cursor-pointer">Contact</li>
                </ul>
            </div>
=======
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul className='flex gap-5 bg-blue-500 py-5 sticky px-5'>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/profile">Profile</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/attendance">Attendance</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/timetable">Time Table</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/datesheet">Date Sheet</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/result">Result</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/fee-status">Fee Status</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/library">Library</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/feedback">Feedback Form</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/logout">Logout</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/leave">Apply for Leave</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/placement">Placement</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/events">Events</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/semester-registration">Semester Registration</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/assignment">Assignment</Link>
                </li>
                <li className='hover:bg-orange-500 cursor-pointer'>
                    <Link to="/problem-solving">Problem Solving</Link>
                </li>
            </ul>
>>>>>>> 1d6ab9fab577de290ca0dd8d7e28ae93fd50d7b6
        </nav>
    );
};

export default Navbar;