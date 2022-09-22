import { useState } from "react";


export const usePagination = (perPageRecords, totalPageRecords)=>{
    const totalPages = Math.ceil(totalPageRecords/perPageRecords)

    const [startPageIndex,setStartPageIndex] = useState(0)
    const [endPageIndex,setEndPageIndex] = useState(perPageRecords - 1)
    const [currentPageIndex, setCurrentPageIndex] = useState(1)


    //function 
    const displayPage = (pageNo)=>{
        setCurrentPageIndex(pageNo)
        let end_page_index = perPageRecords * pageNo -1
        let start_page_index = (perPageRecords * pageNo) - perPageRecords
        setStartPageIndex(start_page_index)

        if(end_page_index > totalPageRecords){
            setEndPageIndex(totalPageRecords -1)
        }
        else{
            setEndPageIndex(end_page_index)
        }
    }
    return [totalPages,startPageIndex,endPageIndex,currentPageIndex,displayPage]
    
}

// // npm install @mui/material @emotion/react @emotion/styled


// import { useMemo } from "react"

// // TOTALCOUNT -TOTAL INDIVIDUAL ROWS,
// //PAGESIZE-HOW MUHC TO SHOW IN ONE PAGE
// //SIBLINGCOUNT => How much page number you want to show  -- 1,2...,4,5,6...9,10
// //CURRENT PAGE => CURRENT ACTIVE PAGE 

// function usePagination({
//     totalCount,
//     pageSize,
//     siblingCount = 1,
//     currentPage
// }){
// // previous value + 1
    
//     const range = (start,end)=>{
//         let length = end -start +1

//         return Array.from({length},(_,idx) => idx + start)
//     }

//     //KEEP TRACK IF ANY VALUE CHANGES

//     const paginationRange = useMemo(()=>{

//         //totalPageCount -how many pages will be required
//         //25/10=2.5 -so will show 20 data and wont show last 5 data,for that we use ceil
//         const totalPageCount = Math.ceil(totalCount / pageSize);

//         //
//         const totalPageNumbers = siblingCount + 5;

//         // Case 1 if totalpagecount we wanbt to render is only 1
//         if(totalPageNumbers>=totalPageCount){
//             return range(1,totalPageCount)
//         }

//         const leftSiblingIndex = Math.max(currentPage-siblingCount,1);
//         const rightSiblingIndex = Math.min(currentPage + siblingCount,totalPageCount)

//         // 1..3,4,5..10
//         const shouldShowLeftDots = leftSiblingIndex > 2
//         const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

//         const firstPageIndex = 1;
//         const lastPageIndex = totalPageCount

//         // Case 2 no need for left dot but right dot is needed ie- 1...3,4,5...100 
//         if(!shouldShowLeftDots && shouldShowRightDots){
//             let leftItemCount = 3 + 2 * siblingCount  //  123.100  wehre 1 and 3 are sibling count
//             let leftRange = range(1,leftItemCount)

//             return [...leftRange, DOTS,totalPageCount]
//         }

//         //Case 3 ,no right dot to show but left needed ie - 1..99,100
//         if(shouldShowLeftDots && !shouldShowRightDots){
//             let rightItemCount = 3 + 2 * siblingCount // 1. 98 99 100  where 98 99 are subliung count 
//             let rightRange = range(totalPageCount-rightItemCount +1,  totalPageCount)

//             return [firstPageIndex,DOTS, ...rightRange]
//         }

//         //Case 4 , bot left and right dots need to be shown
//         if(shouldShowLeftDots && shouldShowRightDots){
//             let middleRange = range(leftSiblingIndex, rightSiblingIndex);
//             return [firstPageIndex,DOTS, ...middleRange,lastPageIndex]
//         }
        
//     },[totalCount,pageSize,siblingCount,currentPage]);

    

//     return paginationRange
// }


// export default usePagination