import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
    const [uniqueId, setUniqueId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/login", {
                uniqueId,
                password
            });
            

            console.log(response.data);
            setRole(response.data.user.role);
            alert("Login Successful!");
        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Enrollment Number/Unique ID:</label>
                    <input
                        type="text"
                        name="uniqueId"
                        value={uniqueId}
                        onChange={(e) => setUniqueId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>

                <h1>{role}</h1>
            </form>
        </div>
    );
};

export default Login;
