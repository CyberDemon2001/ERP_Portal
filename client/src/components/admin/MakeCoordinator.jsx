import React, { useEffect, useState } from "react";
import axios from "axios";

function MakeCoordinator() {
  const [staff, setStaff] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [message, setMessage] = useState("");
  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const staffResponse = await axios.get("http://localhost:8080/api/staff");
        const coursesResponse = await axios.get("http://localhost:8080/api/view-courses");
        setStaff(staffResponse.data);
        setCourses(coursesResponse.data.map(course => course.name));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function fetchCoordinators() {
      try {
        const response = await axios.get("http://localhost:8080/api/view-coordinators");
        setCoordinators(response.data);
      } catch (err) {
        console.error("Error fetching coordinators:", err);
        setMessage("Failed to fetch coordinators.");
      }
    }

    fetchData();
    fetchCoordinators();
  }, []);

  const assignCoordinator = async () => {
    if (!selectedStaff || !selectedCourse) {
      setMessage("Please select both staff and course.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/assign-coordinator", {
        uniqueId: selectedStaff,
        courseName: selectedCourse,
      });
      setMessage(response.data.message);
      setCoordinators([...coordinators, { name: selectedStaff, course: selectedCourse }]);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to assign coordinator.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Assign Course Coordinator</h2>
      
      <div className="mb-4">
        <label className="block font-medium">Select Staff:</label>
        <select 
  value={selectedStaff} 
  onChange={(e) => setSelectedStaff(e.target.value)}
  className="w-full p-2 border rounded"
>
  <option value="">-- Select Staff --</option>
  {staff.map((s) => (
    <option key={s.uniqueId} value={s.uniqueId}>{s.name}</option> 
  ))}
</select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Select Course:</label>
        <select 
          value={selectedCourse} 
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Course --</option>
          {courses.map((c, index) => (
            <option key={index} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <button 
        onClick={assignCoordinator} 
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Assign Coordinator
      </button>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      
      <h3 className="text-lg font-bold mt-6">Assigned Coordinators</h3>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Staff Name</th>
            <th className="border p-2">Course</th>
          </tr>
        </thead>
        <tbody>
          {coordinators.length > 0 ? (
            coordinators.map((coord, index) => (
              <tr key={index}>
                <td className="border p-2">{coord.name}</td>
                <td className="border p-2">{coord.coordinatorFor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center p-2">No coordinators assigned yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MakeCoordinator;