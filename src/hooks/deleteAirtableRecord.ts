import { deleteDataFromAirtable } from "@/components/services/services";
import { useState, useContext } from "react";
import { ConfigContext } from "@/config";
import { toast } from "react-toastify";

const useDeleteAirtableData = (airtableLabel) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const context = useContext(ConfigContext);
  const { config, removeRecord, findRelatedResumes } = context;
  const { apiKeys } = config;
  const { airtableBase, airtableKey } = apiKeys;

  const deleteRelatedResumes = async (recordId) => {
    if (airtableLabel === "Jobs") {
      try {
        const related = findRelatedResumes(recordId) || [];
        if (related.length === 0) return;

        await Promise.all(
          related.map((resumeId) =>
            deleteDataFromAirtable(
              airtableBase,
              "Resumes",
              airtableKey,
              resumeId
            )
          )
        );

        toast.success("Related resumes deleted successfully!");
      } catch (err) {
        toast.error("Error deleting related resumes:", err);
        toast.error("Failed to delete related resumes.");
      }
    }
  };

  const deleteData = async (recordId) => {
    if (!recordId) {
      toast.error("Error: Missing Airtable Record ID.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await deleteRelatedResumes(recordId);
      await deleteDataFromAirtable(
        airtableBase,
        airtableLabel,
        airtableKey,
        recordId
      );
      removeRecord(recordId);
      setSuccess(true);
      toast.success(`Successfully deleted ${airtableLabel} record!`);
    } catch (err) {
      toast.error("Error deleting Airtable record:", err.message);
      setError(err.message);
      toast.error("Error deleting record from Airtable.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, success, error };
};

export default useDeleteAirtableData;
