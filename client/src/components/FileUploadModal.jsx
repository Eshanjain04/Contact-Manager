import React from 'react';
import {useDropzone} from "react-dropzone"
import "../CSS/fileUploadModal.css";
import {FaFileImport} from "react-icons/fa"
import { useState } from 'react';
import { useEffect } from 'react';

const FileUploadModal = ({isOpen,onClose}) => {
    const [para,setPara] = useState("Drag and Drop CSV file to Upload")
    const data = new FormData();
    const {getRootProps, getInputProps} = useDropzone({
        accept:"csv",
        onDrop : (acceptedFiles) =>{
            console.log(acceptedFiles[0]);
            data.append("csv",acceptedFiles[0]);
            const url = "http://localhost:3050/contact";
            fetch(url,{
                method:"POST",
                headers:{
                    "Authorization":localStorage.getItem('token')
                },
                body:data

            })
            .then(data=>{
                console.log(data.status)
                setPara("CSV File is Uploaded")
                setTimeout(onClose,1000);
                window.location.reload();
            })
            .catch(e=>console.log(e))
        }
    })
    useEffect(()=>{
        setPara("Drag and Drop a CSV file to Upload")
    },[])
    if(!isOpen)return null;
  return (
    <div className='dropzone-container modalContainer'>
        <div className="dropArea" {...getRootProps()}>
            <div className="upload-icon-container">
                <FaFileImport className='upload-icon'/>
            </div>
            <h1>Import files</h1>
            <input name='csv' type="file" {...getInputProps()}/>
            <p>{para}</p>
        </div>
        {para === "CSV File is Uploaded" ? "":<button onClick={onClose}>cancel</button>}
    </div>
  )
}

export default FileUploadModal