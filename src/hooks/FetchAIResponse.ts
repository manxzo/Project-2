import { fetchAiResponse } from "@/components/services/services";
import { useEffect, useState, useContext } from "react";
import { ConfigContext } from "@/config";

const useAiResponse = (job, resume) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const context = useContext(ConfigContext);
  const { config } = context;
  const deepseekApiKey = config.apiKeys.deepSeekApi;

  useEffect(() => {
    if (!job || !resume) {
      setResponse("No Job or Resume Provided");
      return;
    }

    let isMounted = true; 

    const getResponse = async () => {
      try {
        setError(null); 
        const data = await fetchAiResponse(job, resume, deepseekApiKey);

        if (isMounted) {
          setResponse(data.choices?.[0]?.message?.content || "No response from AI");
          console.log(data)
        }
      } catch (err) {
        console.error("API Error:", err.message);
        if (isMounted) setError(err.message);
      }
    };

    getResponse();

    return () => {
      isMounted = false; 
    };
  }, [job, resume, deepseekApiKey]);

  return { response, error };
};

export default useAiResponse;
