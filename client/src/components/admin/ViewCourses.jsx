import { useEffect, useState } from "react";
import axios from "axios";

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/view-courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">View Courses</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Course:</label>
        <select
          className="w-full p-2 border rounded-md"
          onChange={(e) => setSelectedCourse(courses.find(course => course._id === e.target.value))}
        >
          <option value="">-- Select Course --</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.name} ({course.code})
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Select Semester:</label>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
          >
            <option value="">-- Select Semester --</option>
            {selectedCourse.semesters.map(sem => (
              <option key={sem.semesterNumber} value={sem.semesterNumber}>
                Semester {sem.semesterNumber}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCourse && selectedSemester !== null && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Subjects in Semester {selectedSemester}</h3>
          <ul className="mt-2">
            {selectedCourse.semesters.find(sem => sem.semesterNumber === selectedSemester)?.subjects.map((subject, index) => (
              <li key={index} className="p-2 border-b">
                <strong>{subject.name}</strong> ({subject.code}) - {subject.type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewCourses;
