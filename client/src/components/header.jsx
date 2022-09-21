import React from "react";
import "../CSS/header.css"

function Header(){
    return(
        <>
            <div className="header-parent">
                <div className="header-title">Total Contacts</div>
                <div className="search-input-div">
                    <form className="search-input-div2"  action="http://localhost:8080/post" method="POST">
                    <div className="form-flex"><i className="fas fa-search bc"></i></div>
                    <input className="search-input" type="email" placeholder="Search by Email Id...."/>
                    </form>
                </div>
                <div className="user_profile-div">
                    <img className="profile-image" src="./user_icon.png" alt="" />
                    <div className="profile-flex">
                        <div>Ram Darvin</div>
                        <div>Super Admin</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header