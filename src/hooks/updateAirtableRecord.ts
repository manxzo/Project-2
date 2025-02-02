import { editDataInAirtable } from "@/components/services/services";
import { useState, useContext } from "react";
import { ConfigContext } from "@/config";


const useUpdateAirtableData = (airtableLabel,recordId, updatedFields) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const context = useContext(ConfigContext);
  const { config } = context;
  const { apiKeys } = config;
  const { airtableBase, airtableKey } = apiKeys;

  const updateData = async () => {
    if (!airtableBase || !airtableKey || !airtableLabel || !recordId) {
      setError("Missing Airtable credentials, label, or record ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await editDataInAirtable(airtableBase, airtableLabel, airtableKey, recordId, updatedFields);
      setSuccess(true);
    } catch (err) {
      console.error("Error updating Airtable record:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, success, error };
};

export default useUpdateAirtableData;
