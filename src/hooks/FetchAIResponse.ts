import { fetchAiResponse } from "@/components/services/services";
import { useEffect, useState } from "react";

const useAiResponse = (job,resume,deepseekApiKey) => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResponse = async () => {
      try {
        const data = await fetchAiResponse(job,resume,deepseekApiKey);
        setResponse(data.results);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    getResponse();
  }, [job,resume, deepseekApiKey]);

  return { response , error };
};

export default useAiResponse;
