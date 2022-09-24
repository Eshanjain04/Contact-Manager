import React from "react";
import Pagination from '@mui/material/Pagination';
import {usePagination} from '../customhooks/usePagination'
import "../CSS/table.css"
import {BiPencil} from "react-icons/bi"
import {RiDeleteBin5Line} from "react-icons/ri"
import {FaSort} from "react-icons/fa"
import ReactTooltip from 'react-tooltip';

function Pages({data,getIds}){
    console.log(data);
    var [totalPages,startPageIndex,endPageIndex,
        currentPageIndex,//eslint-disable-line
        displayPage] = usePagination(9,data.length)
        var idSet = new Set();

        const getId = (e)=>{
            if(e.target.checked){
                idSet.add(e.target.parentElement.id);
            }else{
                idSet.delete(e.target.parentElement.id);
            }
            getIds(idSet);
        }

        const truncEmail = (email)=>{
            const [name, domain] = email.split('@');
            return `${name}@${domain[0]}......`
        }
    return(
        <>
        <div>
        <table className="table">
            <tr>
                <th style={{width:"150px"}}>
                    <div>
                        <div className="t-name">
                            <div><input className="checky" type="checkbox"/></div>
                            <div >Name</div>
                        </div>
                        <div>|</div>
                    </div>

                </th>
                <th>
                    <div>
                        <div>
                            <div className="margin-designation">Designation</div>
                        </div>
                        <div>
                            <div className="t-designation">
                                <div><FaSort style={{marginTop:"4px"}}/></div>
                                <div>|</div>
                            </div>
                        </div>
                    </div>
                </th>
                <th>
                    <div>
                        <div>
                            <div className="margin-designation">Company</div>
                        </div>
                        <div>
                            <div className="t-designation">
                                <div><FaSort style={{marginTop:"4px"}}/></div>
                                <div>|</div>
                            </div>
                        </div>
                    </div>
                </th>
                <th>
                <div>
                    <div className="desig">
                            <div className="margin-designation">Industry</div>
                        </div>
                        <div>
                            <div className="t-designation">
                                <div><FaSort style={{marginTop:"4px"}}/></div>
                                <div>|</div>
                            </div>
                        </div>
                    </div>
                </th>                
                <th>
                    <div>
                        <div className="t-email">Email</div>
                        <div>|</div>
                    </div>
                </th>                
                <th>
                    <div>
                        <div className="t-email">Phone number</div>
                        <div>|</div>
                    </div>
                </th>                
                <th>
                    <div>
                        <div className="t-email">Country</div>
                        <div>|</div>
                    </div>
                </th>
                <th>
                    <div>
                        <div className="t-email">Action</div>
                    </div>
                </th>
            </tr>
            

        {   
            
            (()=>{
                const displayPosts = []
                if(data.length-1<endPageIndex){
                    endPageIndex = data.length-1;
                    for(let i = startPageIndex;i<=endPageIndex;i++){
                        //console.log("ran"+i+"times")
                        displayPosts.push(
                        <tr key={data[i]._id} className="second-row" >
                            <td style={{width:"150px"}}>
                                    <div className="td-name">
                                        <div id={`${data[i]._id}`}><input onChange={getId} className="checky" type="checkbox"/></div>
                                        <div >{data[i].name}</div>
                                    </div>
    
                            </td>
                            <td>
                                    <div className="td-value">
                                        <div >{data[i].designation}</div>
                                    </div>
    
                            </td>
                            <td>
                                    <div className="td-value">
                                        <div >{data[i].company}</div>
                                    </div>
    
                            </td>                        
                            <td>
                                    <div className="td-value">
                                        <div >{data[i].industry}</div>
                                    </div>
    
                            </td>                        
                            <td>
                                    <div className="td-value">
                                        <div data-tip={data[i].email}>{data[i].email.length>20 ? truncEmail(data[i].email): data[i].email}</div>
            
                                    </div>
    
                            </td>                        
                            <td>
                                    <div className="td-value">
                                        <div >{data[i].phoneNumber}</div>
                                    </div>
    
                            </td>
                            <td>
                                    <div className="td-value">
                                        <div >{data[i].country}</div>
                                    </div>
    
                            </td>
                            <td>
                                    <div className="td-value">
                                    <span style={{marginRight:"5px",color:"#0884FF"}}><BiPencil/></span><span style={{color:"#F81D1D"}}><RiDeleteBin5Line/></span>                                </div>
    
                            </td>
                            
                        </tr>
                        )
                    }
                }
                else{
                    for(let i = startPageIndex;i<=endPageIndex;i++){
                        //console.log("ran"+i+"times")
                        displayPosts.push(
                        <tr key={data[i]._id} className="second-row" >
                            <td style={{width:"150px"}}>
                                    <div className="td-name">
                                        <div id={`${data[i]._id}`}><input onChange={getId} className="checky" type="checkbox"/></div>
                                        <div >{data[i].name}</div>
                                    </div>
    
                            </td>
                            <td>
                                    <div className="td-value">
                                        <div >{data[i].designation}</div>
                                    </div>
    
                            </td>
                            <td>
                                    <div className="td-value">
                                        <div >{data[i].company}</div>
                                    </div>
    
                            </td>                        
                            <td>
                                    <div className="td-value">
                                        <div >{data[i].industry}</div>
                                    </div>
    
                            </td>                        
                            <td>
                                    <div className="td-value">
                                        <div data-tip={data[i].email}>{data[i].email.length>20 ? truncEmail(data[i].email): data[i].email}</div>
            
                                    </div>
    
                            </td>                        
                            <td>
                                    <div className="td-value">
                                        <div >{data[i].phoneNumber}</div>
                                    </div>
    
                            </td>
                            <td>
                                    <div className="td-value">
                                        <div >{data[i].country}</div>
                                    </div>
    
                            </td>
                            <td>
                                    <div className="td-value">
                                    <span style={{marginRight:"5px",color:"#0884FF"}}><BiPencil/></span><span style={{color:"#F81D1D"}}><RiDeleteBin5Line/></span>                                </div>
    
                            </td>
                        </tr>
                        )
                    }
                }
               
                return displayPosts
            })()
        }
        </table>  

        <Pagination className="pagination" color="primary" count={totalPages} onChange={(event,value)=>displayPage(value)}/>
        <ReactTooltip className="tooltip" place="bottom" backgroundColor="#FFFFFF" textColor="#2DA5FC"/>
        </div>

        </>
    )
}
export default Pages

