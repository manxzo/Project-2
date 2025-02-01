import { useEffect, useState } from "react";
import { fetchSearchResults } from "@/components/services/services";



const useSearchResults = (params, country,page, adzunaApiId, adzunaApiKey) => {
  const [results, setResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!params) return;

    const loadResults = async () => {
      try {
        const data = await fetchSearchResults(
          params,
          country,
          page,
          adzunaApiId,
          adzunaApiKey
        );
        setResults(data.results);
        setResultCount(data.count);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    }
    loadResults();
  }, [params,country,page,adzunaApiId,adzunaApiKey]);
  console.log(JSON.stringify(results))
  return { results, resultCount, error };
};

export default useSearchResults;
