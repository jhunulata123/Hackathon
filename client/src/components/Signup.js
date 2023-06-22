import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    //destructuring 
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
     if (json.success) {
      //Save the auth token and redirect 
      localStorage.setItem("token", json.authToken);
      navigate("/Login"); 
      props.showAlert("Account Created Successfully","success")

    } else {
      // props.showAlert("Invalid Credentials","danger");
      // console.log(json)
      props.showAlert(json.error,"danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  };

  const navtoLogin = () => {
    navigate("/login");
}


  // const checkpassword = (e) =>{
  //   let password = document.getElementById("password");
  //   let Cpassword = document.getElementById("cpassword");

  //   if(password !== Cpassword){
  //     props.showAlert("Passwords do not match","danger")
  //     e.preventDefault()
  //   }
  // }

  return (
    <div className='my-3'>
       <h2 className='my-3 '>Create an Account to use Noteskeep</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" required />

        <label htmlFor="email" className="form-label mt-2">Email address</label>
        <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" required/>

        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5}/>
      </div>
      <button type="submit" className="btn btn-primary login" /* onClick={checkpassword} */ >Create Account</button>
    </form>
    <h6 className='my-4 forgot'>Already have an Account? <span style={{cursor: 'pointer', textDecoration:"underline"}} onClick={navtoLogin}>Login Here. </span></h6> 

    </div>
  )
}

export default Signup
