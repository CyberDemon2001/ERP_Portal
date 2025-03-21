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
        </nav>
    );
};

export default Navbar;