import { deleteDataFromAirtable } from "@/components/services/services";
import { useState, useContext } from "react";
import { ConfigContext } from "@/config";


const useDeleteAirtableData = (airtableLabel) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const context = useContext(ConfigContext);
  const { config } = context;
  const { apiKeys } = config;
  const { airtableBase, airtableKey } = apiKeys;

  const deleteData = async (recordId) => {
    if (!airtableBase || !airtableKey || !airtableLabel || !recordId) {
      setError("Missing Airtable credentials, label, or record ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await deleteDataFromAirtable(airtableBase, airtableLabel, airtableKey, recordId);
      setSuccess(true);
    } catch (err) {
      console.error("Error deleting Airtable record:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, success, error };
};

export default useDeleteAirtableData;
