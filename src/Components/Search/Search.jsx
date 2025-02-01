import { useEffect, useState } from "react";
import SearchResults from "./Components/SearchResults";
import SearchFilter from "./Components/SearchFilter";

const Search = (props) => {
  const country = props.country;
  const { adzunaApiId, adzunaApiKey } = props.apiKeys;
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [searchURL, setSearchURL] = useState(``);
  const [resultCount, setResultCount] = useState(0);
  const [page,setPage] = useState(1);
  const [message, setMessage] = useState("");
  const searchEndpoint = `https://api.adzuna.com/v1/api/jobs/${country}/search/`;
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://api.adzuna.com/v1/api/jobs/${country}/categories?app_id=${adzunaApiId}&app_key=${adzunaApiKey}`
        );
        if (!response.ok) {
          setMessage(response.status);
        }
        const data = await response.json();
        setCategories(data.results);
      } catch (error) {
        console.error(error.message);
        setMessage(error.message);
      }
      
    };
    fetchCategories();
  }, [country,adzunaApiId,adzunaApiKey]);

  const handleSearch = (paramsURL) => {
    const newSearchURL = `${searchEndpoint + paramsURL}`
    setSearchURL(newSearchURL);
  };
  useEffect(() => {
    if (!searchURL) return; 
    setMessage('')
    const fetchResult = async () => {
      try {
        const response = await fetch(searchURL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.results);
        setResultCount(data.count);
      } catch (error) {
        console.error(error);
        setMessage(error.message);
      }
    };
    fetchResult();
  }, [searchURL]); 
  
  return (
    <>
      <SearchFilter handleSearch={handleSearch} adzunaApiId={adzunaApiId} adzunaApiKey={adzunaApiKey} categories={categories} setPage={setPage}/>
      <h4>Page {page}</h4>
      <SearchResults message={message} results={results} resultCount={resultCount}/>  
    </>
  );
};

export default Search;
