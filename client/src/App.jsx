import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./components/admin/admin";
import Register from "./components/admin/register";
import Login from './components/common/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
