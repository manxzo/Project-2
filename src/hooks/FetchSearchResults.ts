import { useEffect, useState } from "react";
import { fetchSearchResults } from "@/components/services/services";
import { ConfigContext } from "@/config";
import { useContext } from "react";

const useSearchResults = (params, page) => {
  const [results, setResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [error, setError] = useState(null);
  const context = useContext(ConfigContext);
  const { config } = context;
  const { apiKeys } = config;
  const { adzunaApiId, adzunaApiKey } = apiKeys;
  const { country } = config;
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
    };
    loadResults();
  }, [params, country, page, adzunaApiId, adzunaApiKey]);
  console.log(JSON.stringify(results));
  return { results, resultCount, error };
};

export default useSearchResults;
