
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import { useEffect,useState } from 'react';
import Sidebar from"../components/SideBar";
import Header from '../components/header';
import Pages from '../components/pages';
import MiddleBar from '../components/middlebar';
import FileUploadModal from './FileUploadModal';
import "../CSS/main.css";
import DeleteModal from './DeleteModal';

const Main = () => {
    //var deleteContacts = new Set();
    const [data,setData] = useState([])
    const [searchItem,setSearchItem] = useState(false);
    const navigate = useNavigate();
    const [isOpenFile,setIsOpenFile] = useState(false);
    const [isOpenDelete,setIsOpenDelete] = useState(false);
    const [deleteIds , setDeleteIds] = useState(new Set());
    const [searched,setSearched] = useState([]);
    var searchedArray =[]
    const handleSearchInput = (childData)=>{
      //console.log(childData);
      if(childData){
        for(let i=0;i<data.length;i++){
          if(data[i].email === childData){
            console.log(data[i]._id);
            searchedArray.pop();
            searchedArray.push(data[i]);
            setSearched(searchedArray)
            setSearchItem(true);
          }
        }
      }else if(childData===""){
        setSearched(data);
      }
    }

    const handleDeleteIds = (idSet)=>{
      for(let i of idSet){
       setDeleteIds(deleteIds.add(i));
      }
    }
    
    const populateContacts = async ()=>{
      if(searchItem){
        setData(searched);
        return;
      }
      const req = await fetch('https://contact-manager-esh.onrender.com/contact', {
        method:"GET",
			headers: {
				'Authorization': localStorage.getItem('token'),
			}
		})

    const contacts = await req.json(); 
      setData(contacts.data);
    }


    useEffect(() => {
      const token = localStorage.getItem('token')
      console.log(token);
      if (token) {
        const user = decodeToken(token);
        console.log(user);
        if (!user) {
          localStorage.clear();
          navigate("/signin")
        }else{
          populateContacts();
        }
      }else{
        navigate("/signin")
      }
    }, [])

  return (
        <div className="wrapper modal">
            <Sidebar/>
            <div className='main-area left-side'>
              <Header data={data} parentCallback = {handleSearchInput}/>
                  <FileUploadModal isOpenFile = {isOpenFile} onClose = {()=>setIsOpenFile(false)}/>
                  <DeleteModal isOpenDelete={isOpenDelete} onCloseDelete = {()=>setIsOpenDelete(false)} deleteIds={deleteIds}/>
              <MiddleBar openDelete={()=>setIsOpenDelete(!isOpenDelete)} openFileModal = {()=>setIsOpenFile(!isOpenFile)}/>
              {
              data.length>0?<Pages  data = {searched.length>0 ? searched :data} getIds = {handleDeleteIds}/> :<p>No Data Available</p>
              }
        </div>
    </div>
  )
}

export default Main