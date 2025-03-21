import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./components/admin/admin";
import Register from "./components/admin/register";
import Login from './components/common/Login';
import Navbar from './components/common/Navbar';
import Profile from './pages/student/profile';
import Attendence from './pages/student/attendance';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/attendance' element={<Attendence />} />
      </Routes>
    </>
  );
}

export default App;
