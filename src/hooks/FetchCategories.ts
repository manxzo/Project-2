import { fetchCategories } from "@/components/services/services";
import { useEffect, useState } from "react";
import { ConfigContext } from "@/config";
import { useContext } from "react";
const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const context = useContext(ConfigContext);
  const {config} = context;
  const {apiKeys} = config;
  const {adzunaApiId,adzunaApiKey} = apiKeys;
  const {country} = config
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories(country, adzunaApiId, adzunaApiKey);
        setCategories(data.results);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    loadCategories();
  }, [country, adzunaApiId, adzunaApiKey]);

  return { categories, error };
};

export default useCategories;
