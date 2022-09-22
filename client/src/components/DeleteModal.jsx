import React from 'react'
import {RiDeleteBin4Line} from "react-icons/ri"
import {AiOutlineCheck} from "react-icons/ai";
import { useState } from 'react';
import { useEffect } from 'react';

const DeleteModal = ({isOpenDelete,onCloseDelete,deleteContacts}) => {
  deleteContacts =  deleteContacts.join(",");
  const [deleteData,setDeleteData] = useState(false);
  const confirmContacts = () =>{
    const url = `http://localhost:3050/contact/${deleteContacts}`
    fetch(url,{
      method:"DELETE",
      headers:{
        "Authorization":localStorage.getItem('token')
      }
    })
    .then((data)=>{
      console.log(data);
      setDeleteData(true);
      window.location.reload();

    })
    .catch(e=>console.log(e));
  }
  useEffect(()=>{
    setDeleteData(false)
},[])
  if(!isOpenDelete)return null;
  return (
    <div>
          <div className='dropzone-container modalContainer'>
            <div className="dropArea">
                <div className="upload-icon-container">
                    {deleteData ?<AiOutlineCheck className='upload-icon'/> : <RiDeleteBin4Line className='upload-icon'/> }
                    
                </div>
                {deleteData ?<h1>Deleted Contacts</h1> :<h1>Delete Contacts</h1>}
                {deleteData ?"":<p>Sure You want to Delete this Contact?</p>}
                {deleteData ? "":<div>
            <button onClick={onCloseDelete}>Cancel</button>
            <button onClick={confirmContacts}>OK</button>
            </div>
            }
            </div>
        </div>
    </div>
  )
}

export default DeleteModal