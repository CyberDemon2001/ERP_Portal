import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const Timetable = () => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const course = user?.course?.toUpperCase() || "";
  const semester = user?.semester || "";
  const romanSemesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]; 
  
  const date = new Date().toLocaleDateString();
  console.log(date);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const timetableRes = await axios.get(
          `http://localhost:8080/api/timetable/${course}/${semester}`
        );
        setTimetable(timetableRes.data);
      } catch (err) {
        setError("Error fetching timetable. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (course && semester) {
      fetchTimetable();
    } else {
      setLoading(false);
      setError("Invalid user data. Please log in again.");
    }
  }, [course, semester]);

  if (loading) return <p className="text-center text-gray-500">Loading timetable...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!timetable || !timetable.schedule)
    return <p className="text-center text-gray-500">No timetable found.</p>;

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    "09:30 - 10:25",
    "10:30 - 11:25",
    "11:30 - 12:25",
    "12:30 - 01:25",
    "01:25 - 02:30", // Lunch Break (Merged)
    "02:30 - 03:10",
    "03:10 - 04:00",
  ];
  

  const exportToExcel = () => {
    if (!timetable || !timetable.schedule) {
      alert("No timetable data available to export.");
      return;
    }

    const wsData = [["Time", ...days]];
    timeSlots.forEach((slot, index) => {
      if (slot === "01:25 - 02:30") {
        wsData.push([slot, "Lunch Break", "", "", "", "", ""]);
      } else {
        const row = [slot];
        days.forEach((day) => {
          const subject = timetable.schedule[day]?.[index]?.subject || "-";
          const faculty = timetable.schedule[day]?.[index]?.faculty || "-";
          const room = timetable.schedule[day]?.[index]?.room || "-";
          row.push(`${subject}\n${faculty}\nRoom No: ${room}`);
        });
        wsData.push(row);
      }
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Timetable");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `Timetable_${course}_Semester${semester}.xlsx`);
  };


  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">
      Course: <span className="underline font-normal">{course}</span> Semester: <span className="underline font-normal">{romanSemesters[semester-1]}</span> Date: <span className="underline font-normal">{date}</span>
      </h2>
      
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Time</th>
            {days.map((day) => (
              <th key={day} className="border p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => {
            if (slot === "01:25 - 02:30") {
              return (
                <tr key={index} className="bg-yellow-100 font-semibold">
                  <td className="border p-2">{slot}</td>
                  <td colSpan={days.length} className="border p-2 text-center">
                    🍽️ Lunch Break
                  </td>
                </tr>
              );
            }
            return (
              <tr key={index}>
                <td className="border p-2 bg-gray-100 font-semibold">{slot}</td>
                {days.map((day) => (
                  <td key={day + slot} className="border p-2">
                    {timetable.schedule[day]?.[index]?.subject || "-"}<br />
                    {timetable.schedule[day]?.[index]?.faculty || "-"}<br />
                    Room No. {timetable.schedule[day]?.[index]?.room || "-"}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={exportToExcel} className="bg-green-500 text-white mt-2 px-4 py-2 rounded">Download as Excel</button>
    </div>
  );
};

export default Timetable;
