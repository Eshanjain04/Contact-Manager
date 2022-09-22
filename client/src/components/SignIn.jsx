import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../CSS/signin.css";

const SignIn = () => {
    const[mailid ,setmailid] = useState("");
    const[password ,setPassword] = useState("");

    const loginUser = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:3050/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify({mailid,password})

        })
        const data = await response.json();
        console.log(data.token);

        if (data.token) {
			localStorage.setItem('token', data.token)
			alert(`Login ${data.Status}`)
			window.location.href = '/'
		} else {
			alert(data.message)
		}
    }
  return (
    <div className='login-main-container'>
        <h1>Logo</h1>
        <p>Enter your credentials to access your account</p>
        <div className='login-container'>
            <form method="post">
                <input onChange={(e)=>setmailid(e.target.value)} type="email" name="mailid" id="mailid" placeholder='User ID'/>
                <input  onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" placeholder='Password'/>
                <button onClick={loginUser}>Sign In</button>
            </form>
            <Link className='signup-link' to="/signup">Sign Up</Link>
        </div>
    </div>
  )
}

export default SignIn