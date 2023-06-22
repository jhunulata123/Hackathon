import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect 
            localStorage.setItem("token", json.authToken);
            props.showAlert("LogIn Successfully","success");
            navigate("/"); 
        } else {
            // props.showAlert("Invalid Credentials","danger")
        }

    }

    const navtoSign = () => {
        navigate("/signup");
    }

    return (
        <div className='my-2'>
            <h2>Login to continue to Noteskeep</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-3 my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name='email' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} name='password' onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary login" >Let me in.</button>
            </form>
            <h6 className='my-4 forgot'>Not have an account? <span style={{cursor: 'pointer', textDecoration:"underline"}} onClick={navtoSign}>Create Here. </span></h6> 
        </div>
    )
}

export default Login    
