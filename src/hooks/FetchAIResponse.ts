import { fetchAiResponse } from "@/components/services/services";
import { useEffect, useState } from "react";
import { useContext} from "react";
import { ConfigContext } from "@/config";
const useAiResponse = (job,resume) => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const context = useContext(ConfigContext);
  const {config} = context;
  const deepseekApiKey = config.apiKeys.deepSeekApi;
  useEffect(() => {
    const getResponse = async () => {
      try {
        const data = await fetchAiResponse(job,resume,deepseekApiKey);
        setResponse(data.data);
        console.log(response)
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
