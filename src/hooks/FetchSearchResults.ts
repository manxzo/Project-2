import { useEffect, useState, useContext } from "react";
import { fetchSearchResults } from "@/components/services/services";
import { ConfigContext } from "@/config";
import { toast } from "react-toastify";

const useSearchResults = (params, page) => {
  const [results, setResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const context = useContext(ConfigContext);
  const { config } = context;
  const { apiKeys, country } = config;
  const { adzunaApiId, adzunaApiKey } = apiKeys;

  useEffect(() => {
    if (!params || !adzunaApiId || !adzunaApiKey) return;

    const loadResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSearchResults(
          params,
          country,
          page,
          adzunaApiId,
          adzunaApiKey
        );
        setResults(data.results || []);
        setResultCount(data.count || 0);
      } catch (err) {
        toast.error("Error fetching search results:", err);
        setError(err.message);
        toast.error(`Search failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [params, country, page, adzunaApiId, adzunaApiKey]);

  return { results, resultCount, error, loading };
};

export default useSearchResults;
