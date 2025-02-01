import { Pagination} from "@heroui/react"
import { useEffect, useState } from "react"
const SearchPagination = ({page,handlePage,resultCount,results_per_page}) =>{
    
    const [pageCount,setPageCount] = useState(1);
    const [dotsJump,setDotsJump] = useState(0);
    useEffect(()=>{
        const newPageCount = Math.ceil(resultCount/results_per_page);
        const newDotsJump = newPageCount>10?newPageCount-5:newPageCount;
        setPageCount(newPageCount);
        setDotsJump(newDotsJump);
    },[resultCount,results_per_page]);


return(
      <Pagination color="secondary" size="lg" page={page} total={pageCount} onChange={handlePage} dotsJump={dotsJump}  isCompact showShadow showControls/>
)
}
export default SearchPagination;