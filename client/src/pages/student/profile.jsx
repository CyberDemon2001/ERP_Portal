import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';

const Profile = () => {
    const [userData, setUserData] = useState({
        uniqueId: '',
        studentNo: '',
        course: '',
        category: '',
        admittedYear: '',
        name: '',
        section: '',
        fatherName: '',
        semesterYear: '',
        batch: '',
        motherName: '',
        dateOfBirth: '',
        academicYear: '',
        mentor: '',
        email: '',
        phone: '',
        city: '',
        address: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserData(user);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        response.ok ? alert('Profile updated successfully!') : alert('Failed to update profile.');
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="uniqueId" placeholder="UniqueId" value={userData.uniqueId||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <input type="text" name="studentNo" placeholder="Student No" value={userData.studentNo||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <input type="text" name="course" placeholder="Course" value={userData.course||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <input type="text" name="category" placeholder="Category" value={userData.category||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <input type="text" name="admittedYear" placeholder="Admitted Year" value={userData.admittedYear||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <input type="text" name="name" placeholder="Name" value={userData.name||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <input type="text" name="fatherName" placeholder="Father's Name" value={userData.fatherName||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <input type="text" name="motherName" placeholder="Mother's Name" value={userData.motherName||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={userData.dateOfBirth||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <input type="text" name="academicYear" placeholder="Academic Year" value={userData.academicYear||''} onChange={handleInputChange} className="border p-2 rounded" />
                    </div>

                    <h2 className="text-xl font-bold mt-6 mb-4">Contact Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="email" name="email" placeholder="Email" value={userData.email||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <input type="tel" name="phone" placeholder="Phone" value={userData.phone||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <input type="text" name="city" placeholder="City" value={userData.city||''} onChange={handleInputChange} className="border p-2 rounded" />
                        <textarea name="address" placeholder="Address" value={userData.address||''} onChange={handleInputChange} className="border p-2 rounded" rows="3"></textarea>
                    </div>
                    
                    <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
                </form>
            </div>
        </>
    );
};

export default Profile;
