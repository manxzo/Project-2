import { postDataToAirtable } from "@/components/services/services";
import { useState, useContext } from "react";
import { ConfigContext } from "@/config";


const usePostAirtableData = (airtableLabel) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const context = useContext(ConfigContext);
  const { config,addJobRecord,addResumeRecord,saveJob,saveResume } = context;
  const { apiKeys } = config;
  const { airtableBase, airtableKey } = apiKeys;
  const postData = async (newRecord) => {
    if (!airtableBase || !airtableKey || !airtableLabel) {
      setError("Missing Airtable credentials or label.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
    const recordId =  await postDataToAirtable(airtableBase, airtableLabel, airtableKey, newRecord);
      airtableLabel==="Jobs"?addJobRecord(newRecord,recordId):addResumeRecord(newRecord,recordId);
      airtableLabel==="Jobs"?saveJob(newRecord):saveResume(newRecord)
      setSuccess(true);
    } catch (err) {
      console.error("Error posting to Airtable:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, success, error };
};

export default usePostAirtableData;
