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

// Private Route Component
const PrivateRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isProfileComplete = user?.isProfileComplete;
    const uniqueId = user?.uniqueId;
    const role = user?.role;

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
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/register" element={<Register />} />
                <Route path="/admin/add-course" element={<AddCourse />} />

                {/* Profile Completion Routes */}
                <Route path="/staff/:uniqueId/profile-completion" element={<ProfileCompletion />} />
                <Route path="/student/:uniqueId/profile-completion" element={<ProfileCompletion />} />

                {/* Protected Staff Routes */}
                <Route path="/staff/:uniqueId/profile" element={<PrivateRoute element={<Profile />} />} />

                {/* Protected Student Routes */}
                <Route path="/student/:uniqueId/profile" element={<PrivateRoute element={<Profile />} />} />
                <Route path="/student/:uniqueId/attendance" element={<PrivateRoute element={<Attendance />} />} />
                <Route path="/student/:uniqueId/library" element={<PrivateRoute element={<Library />} />} />
                <Route path="/student/:uniqueId/feedback" element={<PrivateRoute element={<Feedback />} />} />
                <Route path="/student/:uniqueId/leave" element={<PrivateRoute element={<Leave />} />} />
                <Route path="/student/:uniqueId/placement" element={<PrivateRoute element={<Placement />} />} />
                <Route path="/student/:uniqueId/events" element={<PrivateRoute element={<Events />} />} />
                <Route path="/student/:uniqueId/timetable" element={<PrivateRoute element={<TimeTable />} />} />
                <Route path="/student/:uniqueId/assignment" element={<PrivateRoute element={<Assignment />} />} />
                <Route path="/student/:uniqueId/problem-solving" element={<PrivateRoute element={<ProblemSolving />} />} />
                <Route path="/student/:uniqueId/datesheet" element={<PrivateRoute element={<DateSheet />} />} />
                <Route path="/student/:uniqueId/fee-status" element={<PrivateRoute element={<Fee />} />} />

                {/* Redirect unknown routes */}
                {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            </Routes>
        </>
    );
}

export default App;
