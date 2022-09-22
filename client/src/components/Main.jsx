import React from 'react'
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import { useEffect,useState } from 'react';
import Sidebar from"../components/SideBar";
import Header from '../components/header';
import FileUploadModal from './FileUploadModal';
import "../CSS/main.css";
import DeleteModal from './DeleteModal';

const Main = () => {
    const [data,setData] = useState([])
    const [searchItem,setSearchItem] = useState({})
    const navigate = useNavigate();
    const [isOpenFile,setIsOpenFile] = useState(false);
    const [isOpenDelete,setIsOpenDelete] = useState(true);
    const handleSearchInput = (childData)=>{
        console.log(childData);
        setSearchItem(childData)
    }
    
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

    const deleteContacts = ["632c0d27a1cc334266e31c36"]
  return (
    <div>
        <div className="wrapper modal">
            <Sidebar/>
            <div className="main-area">
                <Header data={data} parentCallback = {handleSearchInput}/>
                <FileUploadModal isOpenFile = {isOpenFile} onClose = {()=>setIsOpenFile(false)}/>
                <DeleteModal isOpenDelete = {isOpenDelete} onCloseDelete = {()=>setIsOpenDelete(false)} deleteContacts = {deleteContacts}/>
            </div>
        </div>
    </div>
  )
}

export default Main