import './App.css';
import { Route, Routes } from "react-router-dom";
import Admin from "./components/admin/admin";
import Register from "./components/admin/register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
