import { fetchCategories } from "@/components/services/services";
import { useEffect, useState, useContext } from "react";
import { ConfigContext } from "@/config";
import { toast } from "react-toastify";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const context = useContext(ConfigContext);
  const { config } = context;
  const { apiKeys, country } = config;
  const { adzunaApiId, adzunaApiKey } = apiKeys;

  useEffect(() => {
    if (!adzunaApiId || !adzunaApiKey) {
      setError("Missing API credentials.");
      toast.error(error);
      return;
    }

    const loadCategories = async () => {
      setError(null);
      try {
        const data = await fetchCategories(country, adzunaApiId, adzunaApiKey);
        setCategories(data.results || []);
      } catch (err) {
        setError(err.message);
        toast.error(`Failed to load categories: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [country, adzunaApiId, adzunaApiKey]);

  return { categories, error};
};

export default useCategories;
