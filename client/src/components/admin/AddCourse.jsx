import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
    const navigate = useNavigate();
  const [course, setCourse] = useState({
    name: "",
    code: "",
    duration: "",
    semesters: [], // ✅ Changed from object to array
  });

  const handleChange = (e, semesterNumber = null, subjectIndex = null) => {
    const { name, value } = e.target;

    setCourse((prev) => {
      if (semesterNumber !== null) {
        return {
          ...prev,
          semesters: prev.semesters.map((sem) =>
            sem.semesterNumber === semesterNumber
              ? {
                  ...sem,
                  subjects: sem.subjects.map((sub, index) =>
                    index === subjectIndex ? { ...sub, [name]: value } : sub
                  ),
                }
              : sem
          ),
        };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const addSemester = (semesterNumber) => {
    setCourse((prev) => {
      if (prev.semesters.some((sem) => sem.semesterNumber === semesterNumber)) {
        alert(`Semester ${semesterNumber} already exists!`);
        return prev;
      }
      return {
        ...prev,
        semesters: [...prev.semesters, { semesterNumber, subjects: [{ name: "", code: "", type: "core" }] }],
      };
    });
  };

  const addSubject = (semesterNumber) => {
    setCourse((prev) => {
      return {
        ...prev,
        semesters: prev.semesters.map((sem) =>
          sem.semesterNumber === semesterNumber
            ? { ...sem, subjects: [...sem.subjects, { name: "", code: "", type: "core" }] }
            : sem
        ),
      };
    });
  };

  const removeSemester = (semesterNumber) => {
    setCourse((prev) => ({
      ...prev,
      semesters: prev.semesters.filter((sem) => sem.semesterNumber !== semesterNumber),
    }));
  };

  const removeSubject = (semesterNumber, subjectIndex) => {
    setCourse((prev) => ({
      ...prev,
      semesters: prev.semesters.map((sem) =>
        sem.semesterNumber === semesterNumber
          ? { ...sem, subjects: sem.subjects.filter((_, index) => index !== subjectIndex) }
          : sem
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/add-course", course);
      alert("Course added successfully!");
      setCourse({ name: "", code: "", duration: "", semesters: [] });
    } catch (error) {
      alert("Error adding course: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <>
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Add Course</h2>
      <button
  onClick={() => navigate("/admin/view-courses")}
  className="bg-purple-600 text-white font-medium px-4 py-2 rounded-lg mb-2 shadow-md transition-all hover:bg-purple-700 hover:scale-105"
>
  📚 View Courses
</button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" name="name" placeholder="Course Name" value={course.name} onChange={handleChange} required className="p-2 border rounded-md" />
          <input type="text" name="code" placeholder="Course Code" value={course.code} onChange={handleChange} required className="p-2 border rounded-md" />
          <input type="text" name="duration" placeholder="Duration" value={course.duration} onChange={handleChange} required className="p-2 border rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Enter Semester Number" id="semesterInput" className="p-2 border rounded-md w-40" />
          <button type="button" onClick={() => {
            const semNumber = parseInt(document.getElementById("semesterInput").value);
            if (!isNaN(semNumber) && semNumber > 0) addSemester(semNumber);
          }} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Add Semester
          </button>
        </div>
        {course.semesters.map((semester) => (
          <div key={semester.semesterNumber} className="p-4 bg-white shadow-md rounded-lg mt-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">Semester {semester.semesterNumber}</h4>
              <button type="button" onClick={() => removeSemester(semester.semesterNumber)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">Remove</button>
            </div>
            {semester.subjects.map((subject, subIndex) => (
              <div key={subIndex} className="mt-2 p-3 bg-gray-50 border rounded-md">
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" name="name" placeholder="Subject Name" value={subject.name} onChange={(e) => handleChange(e, semester.semesterNumber, subIndex)} className="p-2 border rounded-md" />
                  <input type="text" name="code" placeholder="Subject Code" value={subject.code} onChange={(e) => handleChange(e, semester.semesterNumber, subIndex)} className="p-2 border rounded-md" />
                  <select name="type" value={subject.type} onChange={(e) => handleChange(e, semester.semesterNumber, subIndex)} className="p-2 border rounded-md">
                    <option value="core">Core</option>
                    <option value="elective">Elective</option>
                  </select>
                </div>
                <button type="button" onClick={() => removeSubject(semester.semesterNumber, subIndex)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Remove Subject</button>
              </div>
            ))}
            <button type="button" onClick={() => addSubject(semester.semesterNumber)} className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">+ Add Subject</button>
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Submit</button>
      </form>
      
    </div>
    
    </>
  );
};

export default AddCourse;
