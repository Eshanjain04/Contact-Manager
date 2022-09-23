
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
    const [searchItem,setSearchItem] = useState({})
    const navigate = useNavigate();
    const [isOpenFile,setIsOpenFile] = useState(false);
    const [isOpenDelete,setIsOpenDelete] = useState(false);
    const [deleteIds , setDeleteIds] = useState(new Set());
    var searched =[]
    const handleSearchInput = (childData)=>{
        setSearchItem(childData);
        searched.push(searchItem);
    }

    const handleDeleteIds = (idSet)=>{
      for(let i of idSet){
       setDeleteIds(deleteIds.add(i));
      }
    }
    
    const populateContacts = async ()=>{
      const req = await fetch('http://localhost:3050/contact', {
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
        <div className="wrapper modal">
            <Sidebar/>
            <div className='main-area left-side'>
              <Header data={data} parentCallback = {handleSearchInput}/>
                  <FileUploadModal isOpenFile = {isOpenFile} onClose = {()=>setIsOpenFile(false)}/>
                  <DeleteModal isOpenDelete={isOpenDelete} onCloseDelete = {()=>setIsOpenDelete(false)} deleteIds={deleteIds}/>
              <MiddleBar openDelete={()=>setIsOpenDelete(!isOpenDelete)} openFileModal = {()=>setIsOpenFile(!isOpenFile)}/>
              {
              data.length>0?<Pages  data ={searched.length > 0 ? searched : data} getIds = {handleDeleteIds}/> :<p>No Data Available</p>
              }
        </div>
    </div>
  )
}

export default Main