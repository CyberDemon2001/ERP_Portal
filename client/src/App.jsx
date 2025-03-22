import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./components/admin/admin";
import Register from "./components/admin/register";
import Login from './components/common/Login';
import Navbar from './components/common/Navbar';
import Profile from './pages/student/profile';
import Attendance from './pages/student/Attendence';
import Library from './pages/student/Library';
import Feedback from './pages/student/Feedback';
import Leave from './pages/student/Leave';
import Placement from './pages/student/Placement';
import Events from './pages/student/Events';
import SemesterRegistration from './pages/student/SemesterRegistration';
import Assignment from './pages/student/Assignment';
import ProblemSolving from './pages/student/ProblemSolving';
import TimeTable from './pages/student/timetable';
import Fee from './pages/student/fee';
import DateSheet from './pages/student/datesheet';
import Result from './pages/student/result';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/register" element={<Register />} />

        {/* Student Routes with uniqueId */}
        <Route path="/student/:uniqueId" element={<Profile />} />
        <Route path="/student/:uniqueId/attendance" element={<Attendance />} />
        <Route path="/student/:uniqueId/result" element={<Result />} />
        <Route path="/student/:uniqueId/library" element={<Library />} />
        <Route path="/student/:uniqueId/feedback" element={<Feedback />} />
        <Route path="/student/:uniqueId/leave" element={<Leave />} />
        <Route path="/student/:uniqueId/placement" element={<Placement />} />
        <Route path="/student/:uniqueId/events" element={<Events />} />
        <Route path="/student/:uniqueId/timetable" element={<TimeTable />} />
        <Route path="/student/:uniqueId/semester-registration" element={<SemesterRegistration />} />
        <Route path="/student/:uniqueId/assignment" element={<Assignment />} />
        <Route path="/student/:uniqueId/problem-solving" element={<ProblemSolving />} />
        <Route path="/student/:uniqueId/datesheet" element={<DateSheet />} />
        <Route path="/student/:uniqueId/fee-status" element={<Fee />} />
        
      </Routes>
    </>
  );
}

export default App;
