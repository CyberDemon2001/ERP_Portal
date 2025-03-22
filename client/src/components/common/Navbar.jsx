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
        </nav>
    );
};

export default Navbar;
