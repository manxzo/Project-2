import DefaultLayout from "@/layouts/default";
import ResumeResult from "./Components/ResumeResult";
import ResumeUploader from "./Components/ResumeUpload";
import { useState, useContext } from "react";
import { ConfigContext } from "@/config";
import useAiResponse from "@/hooks/FetchAIResponse";
const Resume = () => {
  const context = useContext(ConfigContext)
  const {config} = context;
  const {apiKeys} = config;
  const {deepSeekApi} = apiKeys;
  const [resume, setResume] = useState("");
  const [job,setJob] = useState(JSON.stringify({"redirect_url":"https://www.adzuna.sg/details/5001691084?utm_medium=api&utm_source=054e2057","__CLASS__":"Adzuna::API::Response::Job","description":"Join us in Transforming Lives Together Pathlight School is the first autism-focused school in Singapore to offer the national curriculum together with life readiness skills. It caters to students on the autism spectrum with related conditions, aged 7 to 18 years, who are cognitively able to access national curriculum but require additional support such as smaller class sizes, special accommodations and teaching staff trained in autism. The team at Autism Intervention, Training & Consultancy (AI\u2026","contract_time":"full_time","location":{"area":["Singapore","North East"],"display_name":"North East, Singapore","__CLASS__":"Adzuna::API::Response::Location"},"title":"Autism Therapist","company":{"__CLASS__":"Adzuna::API::Response::Company","display_name":"Pathlight School / Autism Resource Centre "},"latitude":1.383456,"longitude":103.877277,"created":"2025-01-08T13:51:27Z","id":"5001691084","category":{"label":"Teaching Jobs","__CLASS__":"Adzuna::API::Response::Category","tag":"teaching-jobs"},"adref":"eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNTAwMTY5MTA4NCIsInMiOiJXQS00Q09MZzd4R2tTLUhJQXFxTF9RIn0.dolD4ZHVrxll8g2dEWgux8w2z3p-Pr2iG0DW5ZmvJ0E","salary_is_predicted":"0"}));
  const {response,error} = useAiResponse(job,resume,deepSeekApi);

  
  return (
    <DefaultLayout>
      <div className="flex h-full">
        <ResumeUploader setResume={setResume} />
      </div>
    </DefaultLayout>
  );
};
export default Resume;
