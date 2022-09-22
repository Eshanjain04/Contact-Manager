import React from "react";
import Pagination from '@mui/material/Pagination';
import {usePagination} from '../customhooks/usePagination'
import "../CSS/table.css"
import {BiPencil} from "react-icons/bi"
import {RiDeleteBin5Line} from "react-icons/ri"
import {FaSort} from "react-icons/fa"

function Pages({data}){
    const [totalPages,startPageIndex,endPageIndex,
        currentPageIndex,//eslint-disable-line
    displayPage] = usePagination(3,data.length)
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
                                <div><FaSort/></div>
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
                                <div><FaSort/></div>
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
                                <div><FaSort/></div>
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
                console.log(endPageIndex)

                for(let i = startPageIndex;i<=endPageIndex;i++){
                    console.log("ran"+i+"times")
                    displayPosts.push(
                    <tr className="second-row" id={`${data[i]._id}`}>
                        <td style={{width:"150px"}}>
                                <div className="td-name">
                                    <div><input className="checky" type="checkbox"/></div>
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
                                    <div >{data[i].email}</div>
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
                        

                            {/* <td ><span><input style={{position:"absolute",left:"2%",marginTop:"5px"}} type="checkbox" /></span ><span >{data[i].name}</span></td>
                            <td>{data[i].designation}</td>
                            <td>{data[i].company}</td>
                            <td>{data[i].industry}</td>
                            <td>{data[i].email}</td>
                            <td>{data[i].phoneNumber}</td>
                            <td>{data[i].country}</td>
                            <td></td> */}
                    </tr>
                    )
                }
                return displayPosts
            })()
        }
        </table>  

        <Pagination className="pagination" color="primary" count={totalPages} onChange={(event,value)=>displayPage(value)}/>
        </div>

        </>
    )
}
export default Pages

