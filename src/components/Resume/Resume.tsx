// @ts-nocheck
import DefaultLayout from "@/layouts/default";
import ResumeResult from "./Components/ResumeResult";
import ResumeUploader from "./Components/ResumeUpload";
import { useState, useEffect } from "react";
import ResumeJobCard from "./Components/ResumeJobCard";
import { useContext } from "react";
import { ConfigContext } from "@/config";
import useAiResponse from "@/hooks/FetchAIResponse";
import usePostAirtableData from "@/hooks/addAirtableRecord";
import { HeartFilledIcon } from "../icons";
import { Button, ScrollShadow } from "@heroui/react";
import { toast } from "react-toastify";

const Resume = ({job,setJob}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const context = useContext(ConfigContext);
  const { config } = context;
  const {
    saved: { jobs },
  } = config;
  const { response, error, loading, fetchAIResult } = useAiResponse();
  const result = response ? response.toString() : "No Response";
  const { postData, loading: loadingSave } = usePostAirtableData("Resumes");
  const resumeRecord = {
    id: `${date.toTimeString()}${date.toDateString()}`,
    job_id: job?.id,
    text: result,
  };
  const handleSave = () => {
    if (response && job) {
      postData(resumeRecord);
      toast.success("Saved!")
    } else {
      toast.error("No Record to Save!");
    }
  };
  return (
    <DefaultLayout>
      <div className="flex flex-col lg:flex-row h-screen w-full p-6 gap-6 bg-gray-100 dark:bg-gray-900 text-center">
        <div className="flex flex-col w-full lg:w-2/3 h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Upload or Write Resume
          </h2>
          <ResumeUploader
            job={job}
            loading={loading}
            fetchAIResult={fetchAIResult}
          />

          <div className="mt-6">
            <div className="flex items-center  w-full gap-5 text-center">
              <div className="justify-items-center flex-auto">
                 <h2 className="text-xl font-bold text-black-800 dark:text-white mb-4 ">
                AI Optimized Resume
              </h2>
              </div>
             
              <div className="flex-col  justify-items-end flex-shrink">
                <div>
                  <Button
                  color="danger"
                  onPress={() => handleSave()}
                  isLoading={loadingSave}
                  isIconOnly
              
                >
                  <HeartFilledIcon />
                </Button>
                <h2 >Save Result!</h2>
                </div>
                
              </div>
            </div>

            <ScrollShadow hideScrollBar size={140} className="h-[350px] overflow-y-auto text-black-800 dark:text-white">
              <ResumeResult response={response} error={error} />
            </ScrollShadow>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/3 h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Saved Jobs
          </h2>
          <ScrollShadow hideScrollBar size={200} className="h-full overflow-y-auto flex-col">
             
            {jobs.length > 0 ? (
              jobs.map((displayJob) => {
                return (
                  <ResumeJobCard
                    key={displayJob.id}
                    displayJob={displayJob}
                    job={job}
                    setJob={setJob}
                  />
                );
              })
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No saved jobs yet.
              </p>
            )}
          
          </ScrollShadow>
         
        </div>
      </div>
    </DefaultLayout>
  );
};
export default Resume;
