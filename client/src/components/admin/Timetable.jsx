import React, { useEffect, useState } from "react";
import axios from "axios";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const lectureTimings = [
    { start: "9:30 AM", end: "10:25 AM" },
    { start: "10:30 AM", end: "11:25 AM" },
    { start: "11:30 AM", end: "12:25 PM" },
    { start: "12:30 PM", end: "01:25 PM" },
    { start: "01:25 PM", end: "02:25 PM" },
    { start: "2:25 PM", end: "03:10 PM" },
    { start: "3:10 PM", end: "03:55 PM" }
];

const Timetable = () => {
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [schedule, setSchedule] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseRes = await axios.get("http://localhost:8080/api/view-courses");
                const facultyRes = await axios.get("http://localhost:8080/api/staff");
                setCourses(courseRes.data || []);
                setFaculty(facultyRes.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!selectedCourse) {
            setSemesters([]);
            return;
        }

        const selected = courses.find(course => course._id === selectedCourse);
        setSemesters(selected?.semesters || []);
    }, [selectedCourse, courses]);

    useEffect(() => {
        if (!selectedCourse || !selectedSemester) {
            setSubjects([]);
            return;
        }

        const selectedCourseObj = courses.find(course => course._id === selectedCourse);
        const selectedSemesterObj = selectedCourseObj?.semesters.find(
            semester => semester.semesterNumber.toString() === selectedSemester
        );

        setSubjects(selectedSemesterObj?.subjects || []);
    }, [selectedCourse, selectedSemester, courses]);

    const handleScheduleChange = (day, lectureIndex, key, value) => {
        setSchedule(prev => {
            const updatedSchedule = { ...prev };
    
            if (!updatedSchedule[day]) {
                updatedSchedule[day] = {};
            }
    
            if (!updatedSchedule[day][lectureIndex]) {
                updatedSchedule[day][lectureIndex] = {};
            }
    
            if (key === "subject") {
                const subjectObj = subjects.find(sub => sub._id === value);
                updatedSchedule[day][lectureIndex][key] = subjectObj ? subjectObj.name : "";
            } else if (key === "faculty") {
                const facultyObj = faculty.find(f => f._id === value);
                updatedSchedule[day][lectureIndex][key] = facultyObj ? facultyObj.name : "";
            } else {
                updatedSchedule[day][lectureIndex][key] = value;
            }
    
            if (key === "duration") {
                if (value === "2" && lectureIndex < lectureTimings.length - 1) {
                    updatedSchedule[day][lectureIndex + 1] = { merged: true };
                } else {
                    delete updatedSchedule[day][lectureIndex + 1];
                }
            }
    
            return updatedSchedule;
        });
    };
    

    const handleSubmit = async () => {
        try {
            const selectedCourseObj = courses.find(course => course._id === selectedCourse);
            const timetableData = {
                course: selectedCourseObj ? selectedCourseObj.name.toUpperCase() : "",
                semester: selectedSemester,
                schedule
            };

            await axios.post("http://localhost:8080/api/create-timetable", timetableData);
            alert("Timetable created successfully!");
        } catch (error) {
            console.error("Error creating timetable:", error);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg max-w-screen mx-auto">
            <h2 className="text-xl font-bold text-center mb-4">Create Timetable</h2>

            {/* Course & Semester Selection */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Select Course</option>
                    {courses.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>

                <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="border p-2 rounded"
                    disabled={!selectedCourse}
                >
                    <option value="">Select Semester</option>
                    {semesters.map(s => (
                        <option key={s._id} value={s.semesterNumber}>
                            Semester {s.semesterNumber}
                        </option>
                    ))}
                </select>
            </div>

            {subjects.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Assign Subjects for Each Day</h3>

                    {/* Scrollable Table Container */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 text-sm">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2 w-5">Day</th>
                                    {lectureTimings.map((time, index) => (
                                        <th key={index} className="border p-2 w-5">
                                            {time.start} - {time.end}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {daysOfWeek.map((day) => (
                                    <tr key={day}>
                                        <td className="border p-2 font-semibold">{day}</td>
                                        {lectureTimings.map((_, index) => {
                                            if (schedule[day]?.[index]?.merged) {
                                                return null; // Skip rendering merged columns
                                            }
                                            return (
                                                <td
                                                    key={index}
                                                    className="border p-2"
                                                    colSpan={schedule[day]?.[index]?.duration === "2" ? 2 : 1}
                                                >
                                                    {index === 4 ? (
                                                        <span className="text-gray-500 text-xs">Lunch Break</span>
                                                    ) : (
                                                        <div className="flex flex-col gap-1">
                                                            {/* Subject Selection */}
                                                            <select
                                                                className="border p-1 rounded text-xs"
                                                                onChange={(e) => handleScheduleChange(day, index, "subject", e.target.value)}
                                                            >
                                                                <option value="">Select</option>
                                                                {subjects.map(sub => (
                                                                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                                                                ))}
                                                            </select>

                                                            {/* Faculty Selection */}
                                                            <select
                                                                className="border p-1 rounded text-xs"
                                                                onChange={(e) => handleScheduleChange(day, index, "faculty", e.target.value)}
                                                            >
                                                                <option value="">Faculty</option>
                                                                {faculty.map(f => (
                                                                    <option key={f._id} value={f._id}>{f.name}</option>
                                                                ))}
                                                            </select>

                                                            {/* Room Number */}
                                                            <input
                                                                type="text"
                                                                placeholder="Room No"
                                                                className="border p-1 rounded text-xs"
                                                                onChange={(e) => handleScheduleChange(day, index, "room", e.target.value)}
                                                            />

                                                            {/* Lecture Duration */}
                                                            <select
                                                                className="border p-1 rounded text-xs"
                                                                onChange={(e) => handleScheduleChange(day, index, "duration", e.target.value)}
                                                            >
                                                                <option value="1">1 Hr</option>
                                                                <option value="2">2 Hrs</option>
                                                            </select>
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-3 w-full text-sm"
                    >
                        Create Timetable
                    </button>
                </div>
            )}
        </div>
    );
};

export default Timetable;
