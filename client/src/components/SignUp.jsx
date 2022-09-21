import React, { useState } from 'react'
import "../CSS/signup.css";

const SignUp = () => {
    const[mailid ,setmailid] = useState("");
    const[password ,setPassword] = useState("");
    const[cnfPassword ,setCnfPassword] = useState("");

    const loginUser = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:3050/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify({mailid,password,cnfPassword})
        })

        const data = await response.json();
        console.log(data.token);

        if (data.token) {
			localStorage.setItem('token', data.token)
			alert('Account Created')
			window.location.href = '/'
		}
        else {
			alert(data.message)
		}
    }
  return (
    <div className='login-main-container'>
        <h1>Logo</h1>
        <p>Create new account</p>
        <div className='login-container'>
            <form method="post">
                <input onChange={(e)=>setmailid(e.target.value)} type="email" name="mailid" id="mailid" placeholder='User ID'/>
                <input  onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" placeholder='Password'/>
                <input  onChange={(e)=>setCnfPassword(e.target.value)} type="password" name="password" id="password" placeholder='Confirm Password'/>

                <button className='signup-btn' onClick={loginUser}>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp