import { useEffect,useState } from "react";
import ReactSlider from "react-slider";

const SearchFilter = (props) => {
  const adzunaApiId = props.adzunaApiId;
  const adzunaApiKey = props.adzunaApiKey;
  const [filter, setFilter] = useState({
    keyword: "",
    category: "",
    resultsPerPage: 50,
    pageNumber: 1,
    maxDaysOld: 0,
    sortByDate: false,
  });
  const [salaryRange, setSalaryRange] = useState([0, 50000]);
  const [searchParamsURL, setSearchParamsURL] = useState(``);
  useEffect(() => {
    if (searchParamsURL) {
      props.handleSearch(searchParamsURL);
    }
  }, [searchParamsURL]);
  const updateURL = () => {
    let params = [
      `app_id=${adzunaApiId}`,
      `app_key=${adzunaApiKey}`,
      `results_per_page=${filter.resultsPerPage}`,
    ];

    if (filter.keyword)
      params.push(`what=${encodeURIComponent(filter.keyword)}`);
    if (filter.category) params.push(`category=${filter.category}`);
    if (filter.maxDaysOld) params.push(`max_days_old=${filter.maxDaysOld}`);
    if (filter.sortByDate) params.push(`sort_by=date`);
    if (salaryRange[0]) params.push(`salary_min=${salaryRange[0]}`);
    if (salaryRange[1]) params.push(`salary_max=${salaryRange[1]}`);
    const queryString = params.join("&");
    setSearchParamsURL(`${filter.pageNumber}?${queryString}`);
  };

  const handleInputChange = (event) => {
    setFilter((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    updateURL();
    props.setPage(filter.pageNumber);
    ;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="category">Select Category:</label>
      <select name="category" id="category" onChange={handleInputChange}>
        {props.categories.map((category) => {
          if (category.tag === "unknown") return null;
          return (
            <option key={category.tag} value={category.tag}>
              {category.label}
            </option>
          );
        })}
      </select>
      <label htmlFor="keyword">Keywords:</label>
      <input
        name="keyword"
        id="keyword"
        value={filter.keyword}
        onChange={handleInputChange}
      ></input>
      <div>
        <label htmlFor="salary">
        Salary Range:{salaryRange[0]}-{salaryRange[1]}
      </label>
      <ReactSlider
        value={salaryRange}
        onChange={setSalaryRange}
        min={0}
        max={50000}
        step={1000}
        minDistance={1000}
        pearling
        withTracks
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
      />
      </div>
      
      <label htmlFor="resultsPerPage">
        Results per Page:{filter.resultsPerPage}
      </label>
      <ReactSlider
        value={filter.resultsPerPage}
        onChange={(value) =>
          setFilter((prev) => ({ ...prev, resultsPerPage: value }))
        }
        min={10}
        max={250}
        step={10}
        pearling
        withTracks
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
      />
       <label htmlFor="maxDaysOld">
        {filter.maxDaysOld?`Posted at most:${filter.maxDaysOld} days ago`:`All Entries`}
      </label>
      <ReactSlider
        value={filter.maxDaysOld}
        onChange={(value) =>
          setFilter((prev) => ({ ...prev, maxDaysOld: value }))
        }
        min={0}
        max={99}
        step={1}
        pearling
        withTracks
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
      />
      <label htmlFor="pageNumber">Go to Page:</label>
      <input
        type="number"
        name="pageNumber"
        id="pageNumber"
        value={filter.pageNumber}
        min={1}
        max={9999}
        onChange={handleInputChange}
      ></input>
      <button
      type="button"
        onClick={()=>setFilter((prev) => ({ ...prev, sortByDate: !prev.sortByDate }))}
      >
        Sort By: {filter.sortByDate ? "Date" : "Relevance"}
      </button>
      <button type="submit">Search</button>
    </form>
  );
};
export default SearchFilter;
