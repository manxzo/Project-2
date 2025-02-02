// @ts-nocheck
import { useState } from "react";
import SearchFilter from "./Components/SearchFilter";
import SearchResult from "./Components/SearchResults";
import useSearchResults from "@/hooks/FetchSearchResults";
import DefaultLayout from "@/layouts/default";
import { Pagination, Button } from "@heroui/react";
import SearchPagination from "./Components/SearchPagination";
const Search = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({
    what: "",
    where: "",
    category: "",
    results_per_page: 24,
    max_days_old: 0,
    sort_by: "relevance",
    salary_max: 0,
    salary_min: 0,
  });
  const handleSearch = (newParams) => {
    const entries = Object.entries(newParams);
    for (const [key, val] of entries) {
      setParams((prev) => ({ ...prev, [key]: val }));
    }
    setPage(1);
  };
  const handlePage = (page) => {
    setPage(page);
  };
  const { results, resultCount, error } = useSearchResults(params, page);
  return (
    <DefaultLayout>
      <div className="w-full">
        <SearchFilter handleSearch={handleSearch} />
      <div className="flex-col justify-items-center">
        <SearchPagination
          page={page}
          handlePage={handlePage}
          resultCount={resultCount}
          results_per_page={params.results_per_page}
        />
        <SearchResult results={results} resultCount={resultCount} />
      </div>
      </div>
      
    </DefaultLayout>
  );
};

export default Search;
