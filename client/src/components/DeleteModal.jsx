import React from 'react'
import {RiDeleteBin4Line} from "react-icons/ri"
import {AiOutlineCheck} from "react-icons/ai";
import { useState } from 'react';
import { useEffect } from 'react';

const DeleteModal = ({isOpenDelete,onCloseDelete,deleteIds}) => {
  let deleteContactsArray = [];
  for(let i of deleteIds){
    deleteContactsArray.push(i);
  }
  deleteContactsArray =  deleteContactsArray.join(",");
  const [deleteData,setDeleteData] = useState(false);
  const confirmContacts = () =>{
    console.log(deleteContactsArray);
    const url = `https://raeesh-contact-manager.herokuapp.com/contact/${deleteContactsArray}`
    fetch(url,{
      method:"DELETE",
      headers:{
        "Authorization":localStorage.getItem('token')
      }
    })
    .then((data)=>{
      console.log(data);
      setDeleteData(true);
      setTimeout(onCloseDelete,1000);
      window.location.reload();

    })
    .catch(e=>console.log(e));
  }
  useEffect(()=>{
    setDeleteData(false)
},[])
  if(!isOpenDelete)return null;
  return (
    <div className='overlay'>
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