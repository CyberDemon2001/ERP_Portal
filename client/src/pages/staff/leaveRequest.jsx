import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveRequest = () => {
  const [leaveData, setLeavesData] = useState([]);
  const coordinatorFor = JSON.parse(localStorage.getItem("user"))?.coordinatorFor;

  const fetchLeave = async () => {
    if (!coordinatorFor || coordinatorFor.length === 0) {
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/leaves/${coordinatorFor}`);
      setLeavesData(response.data);
    } catch (err) {
      console.error("Failed to fetch leaves", err);
    }
  };

  useEffect(() => {
    fetchLeave();
  }, [coordinatorFor]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Leave Requests for {coordinatorFor}
      </h1>

      {leaveData.length === 0 ? (
        <p className="text-center text-gray-500">No Leave Request Found</p>
      ) : (
        <div className="grid gap-4">
          {leaveData.map((leave, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">{leave.studentName} ({leave.studentID})</h2>
              <p><span className="font-medium">Course:</span> {leave.course} | <span className="font-medium">Semester:</span> {leave.semester}</p>
              <p><span className="font-medium">Leave Dates:</span> {new Date(leave.startDay).toLocaleDateString()} - {new Date(leave.endDay).toLocaleDateString()}</p>
              <p><span className="font-medium">Days Requested:</span> {leave.daysRequested}</p>
              <p><span className="font-medium">Reason:</span> {leave.reason}</p>
              <p><span className="font-medium">Description:</span> {leave.description}</p>
              <p><span className="font-medium">Status:</span> <span className={`font-bold ${leave.status === 'approved' ? 'text-green-600' : leave.status === 'rejected' ? 'text-red-600' : 'text-yellow-500'}`}>{leave.status}</span></p>
              <p className="text-sm text-gray-400 mt-2">Submitted on {new Date(leave.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveRequest;
