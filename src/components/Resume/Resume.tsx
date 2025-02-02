import DefaultLayout from "@/layouts/default";
import ResumeResult from "./Components/ResumeResult";
import ResumeUploader from "./Components/ResumeUpload";
import { useState } from "react";

import useAiResponse from "@/hooks/FetchAIResponse";
const Resume = () => {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState();
  const { response, error } = useAiResponse(job, resume);

  return (
    <DefaultLayout>
      <div className="flex flex-col lg:flex-row h-screen w-full p-6 gap-6 bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col w-full lg:w-2/3 h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Upload or Write Resume
          </h2>
          <ResumeUploader setResume={setResume} />

          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              AI Optimized Resume
            </h2>
            <div className="h-[400px] overflow-y-auto bg-gray-900 p-4 rounded-md text-white">
              <ResumeResult response={response} error={error} />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/3 h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Saved Jobs
          </h2>
          <div className="h-[400px] overflow-y-auto">
            <p className="text-gray-500 dark:text-gray-400">
              No saved jobs yet.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default Resume;
