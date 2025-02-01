import { fetchCategories } from "@/components/services/services";
import { useEffect, useState } from "react";

const useCategories = (country, adzunaApiId, adzunaApiKey) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

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
