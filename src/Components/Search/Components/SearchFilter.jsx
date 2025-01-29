import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
const SearchFilter = (props)=>{
 const filter = props.filter;
 const setFilter = props.setFilter;
const handleInputChange = (event) =>{
    setFilter((prev)=>({...prev,[event.target.name]:event.target.value}));
}
 return(
    <form>
    <label htmlFor="salary">Salary Range:{filter.salary[0]} - {filter.salary[1]}</label>
    <ReactSlider value={filter.salary}/>
    </form>
 )
}
export default SearchFilter;