import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignSubjects = () => {
    const [staff, setStaff] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState('');
    const [semesters, setSemesters] = useState([]);
    const [semester, setSemester] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [assignments, setAssignments] = useState({});

    useEffect(() => {
        // Fetch courses
        axios.get("http://localhost:8080/api/view-courses")
            .then(response => setCourses(response.data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    const handleCourseChange = (e) => {
        const selectedCourse = e.target.value;
        setCourse(selectedCourse);
        
        // Find the selected course and update semesters dropdown
        const courseData = courses.find(c => c.name === selectedCourse);
        setSemesters(courseData ? courseData.semesters : []);
        setSemester(''); // Reset semester selection
    };

    const fetchData = (e) => {
        e.preventDefault();
        
        // Fetch staff members
        axios.get("http://localhost:8080/api/staff")
            .then(response => setStaff(response.data))
            .catch(error => console.error("Error fetching staff:", error));

        // Fetch subjects based on course and semester
        axios.get(`http://localhost:8080/api/subjects/${course}/${semester}`)
            .then(response => setSubjects(response.data))
            .catch(error => console.error("Error fetching subjects:", error));
    };

    const handleAssignSubject = (subjectId) => {
        if (!selectedStaff) {
            alert("Please select a staff member first.");
            return;
        }
        setAssignments(prev => ({
            ...prev,
            [selectedStaff]: [...(prev[selectedStaff] || []), subjectId]
        }));
    };

    const submitAssignments = () => {
        axios.post("http://localhost:8080/api/assign-subjects", assignments)
            .then(() => alert("Subjects assigned successfully!"))
            .catch(error => console.error("Error assigning subjects:", error));
    };
    console.log(assignments);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Assign Subjects</h2>
            
            <form onSubmit={fetchData} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Course:</label>
                    <select 
                        value={course} 
                        onChange={handleCourseChange} 
                        required
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Course</option>
                        {courses.map((c) => (
                            <option key={c._id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Semester:</label>
                    <select 
                        value={semester} 
                        onChange={(e) => setSemester(e.target.value)} 
                        required
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={!course}
                    >
                        <option value="">Select Semester</option>
                        {semesters.map((s) => (
                            <option key={s.semesterNumber} value={s.semesterNumber}>{s.semesterNumber}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Fetch Data
                </button>
            </form>
            
            <h3 className="text-xl font-semibold mt-6">Select Staff</h3>
            <select 
                value={selectedStaff} 
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-2"
            >
                <option value="">Select Staff</option>
                {staff.map(member => (
                    <option key={member._id} value={member._id}>{member.name}</option>
                ))}
            </select>

            <h3 className="text-xl font-semibold mt-6">Assign Subjects</h3>
            <select
                onChange={(e) => handleAssignSubject(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-2"
                disabled={!selectedStaff}
            >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                    <option key={subject._id} value={subject._id}>{subject.name}</option>
                ))}
            </select>

            <h3 className="text-xl font-semibold mt-6">Assigned Subjects</h3>
            <ul className="list-disc pl-5">
                {assignments[selectedStaff]?.map(subjectId => (
                    <li key={subjectId} className="text-gray-800">{subjects.find(sub => sub._id === subjectId)?.name}</li>
                ))}
            </ul>
            
            <button 
                onClick={submitAssignments} 
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Assign Subjects
            </button>
        </div>
    );
};

export default AssignSubjects;