import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./components/admin/admin";
import Register from "./components/admin/register";
import Login from './components/common/Login';
import Navbar from './components/common/Navbar';
import Profile from './pages/student/Profile';
import Attendance from './pages/student/Attendence';
import Result from './pages/student/Result';
import Library from './pages/student/Library';
import Feedback from './pages/student/Feedback';
import Leave from './pages/student/Leave';
import Placement from './pages/student/Placement';
import Events from './pages/student/Events';
import SemesterRegistration from './pages/student/SemesterRegistration';
import Assignment from './pages/student/Assignment';
import ProblemSolving from './pages/student/ProblemSolving';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isProfileComplete = user?.isProfileComplete;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/profile" element={isProfileComplete ? <Profile /> : <Navigate to="/student/:uniqueId/semester-registration" />} />

        

        {/* Student Routes with uniqueId */}
        <Route path="/student/:uniqueId" element={<Profile />} />
        <Route path="/student/:uniqueId/attendance" element={<Attendance />} />
        <Route path="/student/:uniqueId/result" element={<Result />} />
        <Route path="/student/:uniqueId/library" element={<Library />} />
        <Route path="/student/:uniqueId/feedback" element={<Feedback />} />
        <Route path="/student/:uniqueId/leave" element={<Leave />} />
        <Route path="/student/:uniqueId/placement" element={<Placement />} />
        <Route path="/student/:uniqueId/events" element={<Events />} />
        <Route path="/student/:uniqueId/semester-registration" element={<SemesterRegistration />} />
        <Route path="/student/:uniqueId/assignment" element={<Assignment />} />
        <Route path="/student/:uniqueId/problem-solving" element={<ProblemSolving />} />
      </Routes>
    </>
  );
}

export default App;
