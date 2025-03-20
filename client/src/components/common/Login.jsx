import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
    const [enrollmentNumber, setEnrollmentNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleLogin = async () => {
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8080/api/login",{
                enrollmentNumber,
                password
            });

            console.log(response.data);
        }catch(error){
            console.log(error);
        }
        
        console.log('Enrollment Number:', enrollmentNumber);
        console.log('Password:', password);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Enrollment Number:</label>
                    <input
                        type="text"
                        id="enrollmentNumber"
                        value={enrollmentNumber}
                        onChange={(e) => setEnrollmentNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;