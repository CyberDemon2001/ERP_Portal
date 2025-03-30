import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignSubjects = () => {
    const [staff, setStaff] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedCourseName, setSelectedCourseName] = useState('');
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const staffResponse = await axios.get("http://localhost:8080/api/staff");
                const coursesResponse = await axios.get("http://localhost:8080/api/view-courses");
                setCourses(coursesResponse.data);
                setStaff(staffResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleStaffChange = (event) => setSelectedStaff(event.target.value);

    const handleCourseChange = (event) => {
        const courseId = event.target.value;
        const selectedCourseObj = courses.find(course => course._id === courseId);
        setSelectedCourse(courseId);
        setSelectedCourseName(selectedCourseObj ? selectedCourseObj.name : '');
        
        if (selectedCourseObj) {
            setSemesters(selectedCourseObj.semesters || []);
            setSelectedSemester('');
            setSubjects([]);
            setSelectedSubjects([]);
        }
    };

    const handleSemesterChange = async (event) => {
        const semesterNumber = Number(event.target.value);
        setSelectedSemester(semesterNumber);
        
        if (selectedCourse) {
            try {
                const response = await axios.get(`http://localhost:8080/api/subjects/${selectedCourseName}/${semesterNumber}`);
                setSubjects(response.data);
                setSelectedSubjects([]);
            } catch (error) {
                console.error("Error fetching subjects:", error);
                setSubjects([]);
            }
        }
    };

    const handleSubjectChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedSubjects(selectedOptions);
    };

    const assignSubjectToStaff = async () => {
        if (!selectedStaff || selectedSubjects.length === 0) {
            alert("Please select a staff member and at least one subject.");
            return;
        }
    
        const selectedSubjectObjects = subjects.filter(sub => selectedSubjects.includes(sub._id));

        try {
            await axios.post("http://localhost:8080/api/assign-subjects", {
                staffId: selectedStaff,
                subjects: selectedSubjectObjects.map(sub => ({ name: sub.name, code: sub.code }))
            });
            alert("Subjects assigned successfully!");
        } catch (error) {
            console.error("Error assigning subjects:", error);
            alert("Failed to assign subjects.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Assign Subjects to Staff</h2>
            
            <div className="mb-4">
                <label className="block text-gray-600 mb-2">Select Staff:</label>
                <select value={selectedStaff} onChange={handleStaffChange} className="w-full p-2 border rounded">
                    <option value="">--Select Staff--</option>
                    {staff.map(staffMember => (
                        <option key={staffMember.uniqueId} value={staffMember.uniqueId}>{staffMember.name}</option>
                    ))}
                </select>
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-600 mb-2">Select Course:</label>
                <select value={selectedCourse} onChange={handleCourseChange} className="w-full p-2 border rounded">
                    <option value="">--Select Course--</option>
                    {courses.map(course => (
                        <option key={course._id} value={course._id}>{course.name} ({course.code})</option>
                    ))}
                </select>
            </div>
            
            {semesters.length > 0 && (
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Select Semester:</label>
                    <select value={selectedSemester} onChange={handleSemesterChange} className="w-full p-2 border rounded">
                        <option value="">--Select Semester--</option>
                        {semesters.map(sem => (
                            <option key={sem._id} value={sem.semesterNumber}>Semester {sem.semesterNumber}</option>
                        ))}
                    </select>
                </div>
            )}

            {subjects.length > 0 && (
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Select Subjects:</label>
                    <select multiple value={selectedSubjects} onChange={handleSubjectChange} className="w-full p-2 border rounded">
                        {subjects.map(subject => (
                            <option key={subject._id} value={subject._id}>{subject.name} ({subject.code})</option>
                        ))}
                    </select>
                    <small className="text-gray-500">Hold Ctrl (Windows) / Command (Mac) to select multiple subjects.</small>
                </div>
            )}

            <button onClick={assignSubjectToStaff} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Assign Subjects</button>
        </div>
    );
};

export default AssignSubjects;