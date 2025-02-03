import { fetchAiResponse } from "@/components/services/services";
import { useEffect, useState, useContext } from "react";
import { ConfigContext } from "@/config";
import { toast } from "react-toastify";

const useAiResponse = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const context = useContext(ConfigContext);
  const { config } = context;
  const deepseekApiKey = config.apiKeys.deepSeekApi;

 const fetchAIResult =(job,resume) => {
    if (!job || !resume) {
      setResponse("No Job or Resume Provided");
      toast.error(response);
      return;
    }

    const getResponse = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchAiResponse(job, resume, deepseekApiKey);
        setResponse(
          data.choices?.[0]?.message?.content || "No response from AI"
        );
      } catch (err) {
        toast.error("API Error:", err);
        setError(err.message);
        toast.error(`AI Response Error: ${err.message}`);
      }
      setLoading(false);
    };

    getResponse();
  };

  return { response, error, loading,fetchAIResult};
};

export default useAiResponse;
