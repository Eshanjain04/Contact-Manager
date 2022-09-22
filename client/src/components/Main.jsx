import React from 'react'
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import { useEffect,useState } from 'react';
import Sidebar from"../components/SideBar";
import Header from '../components/header';
import Table from '../components/table';
import Pages from '../components/pages';
import MiddleBar from '../components/middlebar';

const Main = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate();
    
    const populateContacts = async ()=>{
      const req = await fetch('http://localhost:3050/contact', {
        method:"GET",
			headers: {
				'Authorization': localStorage.getItem('token'),
			}
		})

    const contacts = await req.json();
      console.log(contacts.data);
      setData(contacts.data);
    }
    useEffect(() => {
      const token = localStorage.getItem('token')
      if (token) {
        const user = decodeToken(token);
        console.log(user);
        if (!user) {
          localStorage.clear();
          navigate("/signin")
        } else {
          populateContacts()
        }
      }else{
        navigate("/signin")
      }
    }, [navigate])
  return (
    <div>
        <div className="wrapper modal">
            <Sidebar/>
            <div className='left-side'>
            <Header data=
             {data}/>
            <MiddleBar/>
            {
            data.length>0?<Pages data ={data}/> :<p>Loading....</p>
            }
            </div>
        </div>
    </div>
  )
}

export default Main