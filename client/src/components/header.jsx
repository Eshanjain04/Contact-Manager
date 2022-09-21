import React from "react";
import "../CSS/header.css"; 
import {AiOutlineSearch} from "react-icons/ai"
import {TiArrowUnsorted} from "react-icons/ti"
import { useState } from "react";

function Header({data}){
    const [value,setValue] = useState("");
    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        // our api to fetch the search result
        setValue(searchTerm)
        console.log("search ", searchTerm);
      };

    return(
        <>
            <div className="header-parent">
                <div className="header-title">Total Contacts</div>
                <div className="search-input-div">
                    <form className="search-input-div2" action="http://localhost:8080/post" method="POST">
                        <div className="form-flex"><AiOutlineSearch className="search-button" onClick={() => onSearch(value)}/></div>
                        <input onChange={e=>setValue(e.target.value)} className="search-input" value={value} type="email" placeholder="Search by Email Id...."/>
                    </form>
                    <div className="dropdown">
                        {data
                            .filter((item) => {
                            const searchTerm = value.toLowerCase();
                            const email = item.email.toLowerCase();

                            return (
                                searchTerm &&
                                email.startsWith(searchTerm) &&
                                email !== searchTerm
                            );
                            })
                            .slice(0, 10)
                            .map((item) => (
                            <div
                                onClick={() => onSearch(item.email)}
                                className="dropdown-row"
                                key={item.email}
                            >
                                <AiOutlineSearch className="search-button"/>
                                {item.email}
                            </div>
                            ))}
                        </div>
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