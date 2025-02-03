import { fetchAirtableData } from "@/components/services/services";
import { useState, useContext } from "react";
import { ConfigContext } from "@/config";
import { toast } from "react-toastify";

const useGetAirtableData = () => {
  const [data, setData] = useState({ jobs: [], resumes: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { config, syncData } = useContext(ConfigContext);
  const { apiKeys } = config;
  const { airtableBase, airtableKey } = apiKeys;

  const fetchAndSyncData = async () => {
    if (!airtableBase || !airtableKey) {
      setError("Missing Airtable credentials.");
      toast.error(error);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [jobsData, resumesData] = await Promise.all([
        fetchAirtableData(airtableBase, "Jobs", airtableKey),
        fetchAirtableData(airtableBase, "Resumes", airtableKey),
      ]);

      if (!jobsData.every((job) => job.id)) {
        toast.error("Some Jobs are missing an 'id' field.");
        throw new Error("Some Jobs are missing an 'id' field.");
      }
      if (!resumesData.every((resume) => resume.id)) {
        toast.error("Some Resumes are missing an 'id' field.");
        throw new Error("Some Resumes are missing an 'id' field.");
      }

      await syncData("Jobs", jobsData);
      await syncData("Resumes", resumesData);
      toast.success("Data Synced!");
      toast.error(jobsData);
      setData({ jobs: jobsData, resumes: resumesData });
    } catch (err) {
      toast.error("Error fetching Airtable data:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchAndSyncData };
};

export default useGetAirtableData;
