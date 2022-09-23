import React from "react";
import "../CSS/table.css"
import {AiOutlineDown} from "react-icons/ai"
import {BsCalendar4} from "react-icons/bs"
import {TbAlignCenter} from "react-icons/tb"
import {AiOutlineDelete} from "react-icons/ai"
import {MdImportExport} from "react-icons/md"
import {BiExport} from "react-icons/bi"

function MiddleBar({openDelete,openFileModal}){
    return(
        <>
            <div className="main-table">
                <div className="main-table-2">
                    <div className="table-left-icons">
                        <div className="button-div date-div">
                            <span style={{marginTop:"5px",marginRight:"3px",fontSize:"15px"}}><BsCalendar4/></span>
                            <span>Select Date</span>
                            <span style={{marginTop:"5px",marginRight:"3px"}}><AiOutlineDown/></span>
                        </div>
                        <div className="button-div filter-div">
                            <span style={{marginTop:"5px",marginRight:"3px"}}><TbAlignCenter/></span>
                            <span>Filter |</span>
                            <span style={{marginTop:"5%",marginRight:"3px"}}><AiOutlineDown/></span>
                        </div>
                    </div>
                    <div className="table-right-icons">
                        <div className="button-div delete-div">
                            <span style={{marginTop:"5px",marginRight:"3px"}}><AiOutlineDelete/></span>
                            <span onClick={openDelete} style={{marginRight:"3px"}}>Delete</span>
                        </div>
                        <div className="button-div import-div">
                            <span style={{marginTop:"5px",marginRight:"3px"}}><MdImportExport/></span>
                            <span onClick={openFileModal} style={{marginRight:"3px"}}>Import</span>   
                        </div>
                        <div className="button-div export-div">
                            <span style={{marginTop:"5px",marginRight:"1px"}}><BiExport/></span>
                            <span>Export</span>
                        </div>
                    </div>

                </div>
            </div> 

        </>
    )

}

export default MiddleBar;