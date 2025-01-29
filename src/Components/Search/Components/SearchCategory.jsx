import { useState } from "react";

const SearchCategory = (props) =>{
    const categories = props.categories;
    const [selection,setSelection] = useState(categories[0]); 
    const setCategory = props.setCategory;
const handleInputChange=(event)=>{
    setSelection(event.target.value);
}
const handleSubmit = (event)=>{
    event.preventDefault();
    setCategory(selection);
}
    return(<form onSubmit={handleSubmit}>
        <label htmlFor="category">Select Category:</label>
        <select name="category" id="category" value={selection} onChange={handleInputChange}>
            {categories.map((category)=>{
                if(category.tag==="unknown") return null;
                return( 
                <option key={category.tag} value={category}>{category.label}</option>)
            })}
        </select>
        <button type="submit">Search Jobs</button>
        </form>)
}
export default SearchCategory;