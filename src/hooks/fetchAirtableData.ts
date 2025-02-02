import { fetchAirtableData } from "@/components/services/services";
import { useEffect, useState, useContext } from "react";
import { ConfigContext } from "@/config";


const useGetAirtableData = (airtableLabel) => {
  const [data, setData] = useState([]); 
  const [error, setError] = useState(null);

  const context = useContext(ConfigContext);
  const { config,syncData } = context;
  const { apiKeys } = config;
  const { airtableBase, airtableKey } = apiKeys;

  useEffect(() => {
    if (!airtableBase || !airtableKey || !airtableLabel) {
      setError("Missing Airtable credentials or label.");
      return;
    }

    const loadData = async () => {
      try {
        const fetchedData = await fetchAirtableData(
          airtableBase,
          airtableLabel,
          airtableKey
        );
        setData(fetchedData.records);
        syncData(airtableLabel,fetchedData.records);
      } catch (err) {
        console.error("Error fetching Airtable data:", err.message);
        setError(err.message);
      }
    };

    loadData();
  }, [airtableBase, airtableKey, airtableLabel]); 

  return { data, error };
};

export default useGetAirtableData; 
