import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./components/admin/admin";
import Register from "./components/admin/register";
import Login from './components/common/Login';
import Navbar from './components/common/Navbar';
import Profile from './components/common/Profile';
import Attendance from './pages/student/Attendence';
import Library from './pages/student/Library';
import Feedback from './pages/student/Feedback';
import Leave from './pages/student/Leave';
import Placement from './pages/student/Placement';
import Events from './pages/student/Events';
import Assignment from './pages/student/Assignment';
import ProblemSolving from './pages/student/ProblemSolving';
import TimeTable from './pages/student/timetable';
import Fee from './pages/student/fee';
import DateSheet from './pages/student/datesheet';
import ProfileCompletion from './components/common/Profile-Completion';
import AddCourse from './components/admin/AddCourse';
import ViewCourses from './components/admin/ViewCourses';
import Timetable from './components/admin/Timetable';
import LeaveRequest from './pages/staff/leaveRequest';
import MakeCoordinator from './components/admin/MakeCoordinator';
import MarkAttendance from './pages/staff/markAttendance';
import AssignSubjects from './components/admin/AssignSubjects';

// Private Route Component
const PrivateRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isProfileComplete = user?.isProfileComplete;
    const uniqueId = user?.uniqueId;
    const role = user?.role;
    console.log(user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!isProfileComplete) {
        return <Navigate to={`/${role}/${uniqueId}/profile-completion`} />;
    }

    return element;
};

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                {/* Admin Route */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/register" element={<Register />} />
                <Route path="/admin/add-course" element={<AddCourse />} />
                <Route path="/admin/view-courses" element={<ViewCourses />} />
                <Route path="/admin/time-table" element={<Timetable />} />
                <Route path="/admin/coordinator" element={<MakeCoordinator />} />
                <Route path="/admin/assignsubjects" element={<AssignSubjects />} />
                



                {/* Profile Completion Routes */}
                <Route path="/:role/:uniqueId/profile-completion" element={<ProfileCompletion />} />
                <Route path="/:role/:uniqueId/profile" element={<PrivateRoute element={<Profile />} />} />

                {/* Staff Routes */}
                <Route path="/:role/:uniqueId/leave-requests" element={<LeaveRequest />} />
                <Route path="/:role/:uniqueId/mark-attendance" element={<MarkAttendance />} />
               

                {/* Protected Student Routes */}
                <Route path="/:role/:uniqueId/attendance" element={<PrivateRoute element={<Attendance />} />} />
                <Route path="/:role/:uniqueId/library" element={<PrivateRoute element={<Library />} />} />
                <Route path="/:role/:uniqueId/feedback" element={<PrivateRoute element={<Feedback />} />} />
                <Route path="/:role/:uniqueId/leave" element={<PrivateRoute element={<Leave />} />} />
                <Route path="/:role/:uniqueId/placement" element={<PrivateRoute element={<Placement />} />} />
                <Route path="/:role/:uniqueId/events" element={<PrivateRoute element={<Events />} />} />
                <Route path="/:role/:uniqueId/timetable" element={<PrivateRoute element={<TimeTable />} />} />
                <Route path="/:role/:uniqueId/assignment" element={<PrivateRoute element={<Assignment />} />} />
                <Route path="/:role/:uniqueId/problem-solving" element={<PrivateRoute element={<ProblemSolving />} />} />
                <Route path="/:role/:uniqueId/datesheet" element={<PrivateRoute element={<DateSheet />} />} />
                <Route path="/:role/:uniqueId/fee-status" element={<PrivateRoute element={<Fee />} />} />

                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;
