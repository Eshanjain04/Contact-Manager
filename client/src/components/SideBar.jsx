import React from 'react'
import "../CSS/sidebar.css";
import {MdOutlineContacts,MdOutlineDashboard,MdOutlineLogout} from "react-icons/md";
import {useNavigate} from "react-router-dom";



const SideBar = () => {
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate("/signin")

    }
  return (
    <>
            <div className='sidebar-container'>
        <div className="logo">
            <h1>Logo</h1>
        </div>
        <div className="navigation-bars">
            <div className="dashboard">
                <MdOutlineDashboard className='dashboard-icon'/>
                <label htmlFor="">DashBoard</label>
            </div>
            <div className="totalcontacts">
                <MdOutlineContacts className='contact-icon'/>
                <label htmlFor="">Total Contacts</label>
                <div className="vertical-line"></div>
            </div>
        </div>
        <div className="logout-container" onClick={logout}>
            <MdOutlineLogout className='logout-logo'/>
            <label htmlFor="">Logout</label> 
        </div>
    </div>
    </>
    
  )
}

export default SideBar