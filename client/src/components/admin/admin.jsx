import React from 'react'
import { useNavigate } from 'react-router-dom';

const admin = () => {
  const navigate = useNavigate();
  return (
    <div className=''>
      <button className='cursor-pointer' onClick={()=>navigate("/admin/register")}>Register</button>
    </div>
  )
}

export default admin;