import { useEffect, useState } from "react";
import SearchResults from "./Components/SearchResults";
import SearchFilter from "./Components/SearchFilter";

const Search = (props) => {
  const country = props.country;
  const { adzunaApiId, adzunaApiKey } = props.apiKeys;
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [filter, setFilter] = useState({});
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(
          `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${adzunaApiId}&app_key=${adzunaApiKey}&results_per_page=10`
        );
        if (!response.ok) {
          setMessage(response.status);
        }
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error(error.message);
        setMessage(error.message);
      }
    };
    fetchResult();
  }, [props]);
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(
          `https://api.adzuna.com/v1/api/jobs/sg/categories?app_id=${adzunaApiId}&app_key=${adzunaApiKey}`
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
    fetchResult();
  }, [props]);
  return (
    <>
      <SearchCategory
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      <SearchFilter filter={filter} setFilter={setFilter} />
      <SearchResults message={message} results={results} />
    </>
  );
};

export default Search;
