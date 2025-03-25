import React from 'react'
import { useNavigate } from 'react-router-dom';

const admin = () => {
  const navigate = useNavigate();
  return (
    <ul className='bg-blue-500 h-10 flex gap-5 px-3 items-center text-white'>
      <li className='cursor-pointer  hover:text-red-600' onClick={()=>navigate("/admin/register")}>Register</li>
      <li className='cursor-pointer  hover:text-red-600' onClick={()=>navigate("/admin/add-course")}>Add Course</li>
      <li className='cursor-pointer  hover:text-red-600' onClick={()=>navigate("/admin/time-table")}>Time Table</li>
    </ul>
    
  )
}

export default admin;