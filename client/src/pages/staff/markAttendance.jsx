import React, { useState } from 'react';
import axios from 'axios';

const MarkAttendance = () => {
  const subjects = JSON.parse(localStorage.getItem("user"))?.subjects || [];
  const [selectedSubject, setSelectedSubject] = useState('');
  const [students, setStudents] = useState([]);
  const [presentStudents, setPresentStudents] = useState([]);

  const handleChange = async (e) => {
    const selectedCode = e.target.value;
    setSelectedSubject(selectedCode);
    setPresentStudents([]);

    if (selectedCode) {
      try {
        const response = await axios.get(`http://localhost:8080/api/students/subject/${selectedCode}`);
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    } else {
      setStudents([]);
    }
  };

  const handleCheckboxChange = (student) => {
    const isAlreadySelected = presentStudents.some(s => s.uniqueId === student.uniqueId);
    if (isAlreadySelected) {
      setPresentStudents(prev => prev.filter(s => s.uniqueId !== student.uniqueId));
    } else {
      setPresentStudents(prev => [...prev, { name: student.name, uniqueId: student.uniqueId }]);
    }
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user")); // Assuming it contains staff info
    try {
      const res = await axios.post("http://localhost:8080/api/attendance", {
        subjectCode: selectedSubject,
        presentStudents,
        allStudents: students,
        markedBy: user?.uniqueId || "unknown-staff"
      });
  
      alert(res.data.message);
    } catch (err) {
      console.error("Error marking attendance:", err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Mark Attendance</h2>

      <div className="mb-6">
        <label htmlFor="subject-select" className="block text-lg font-medium mb-2">Select Subject:</label>
        <select
          id="subject-select"
          value={selectedSubject}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose a subject --</option>
          {subjects.map(subject => (
            <option key={subject.code} value={subject.code}>
              {subject.name} ({subject.code})
            </option>
          ))}
        </select>
      </div>

      {students.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Mark Attendance for <span className="font-bold">{selectedSubject}</span>:</h3>
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {students.map(student => (
              <li key={student.uniqueId} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={presentStudents.some(s => s.uniqueId === student.uniqueId)}
                  onChange={() => handleCheckboxChange(student)}
                />
                <span className="text-gray-800">{student.name} - <span className="text-sm text-gray-500">{student.uniqueId}</span></span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Submit Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
