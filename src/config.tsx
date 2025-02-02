import { join } from "path";
import React, { createContext, useState, ReactNode } from "react";

interface Job {
 title: string;
  company: string;
  description:string;
  id:string;
  location: string;
  min_salary:string;
  max_salary:string;
  date_posted:string;
}
interface Resume {
  id:string;
  text:string;
  job_id:string;
}

interface Config {
  apiKeys: {
    ipInfoKey: string;
    deepSeekApi: string;
    adzunaApiId: string;
    adzunaApiKey: string;
    airtableKey:string;
    airtableBase:string;
  };
  country: string;
  saved:{
    resumes:Resume[];
    jobs:Job[];
  }
  message:string;
}

interface ConfigContextType {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  saveJob: (job:Job)=>void;
  unsaveJob:(job:Job) => void;
  saveResume:(resume:Resume) => void;
  unsaveResume:(resume:Resume)=>void;
  newMessage:(message:string)=>void;
  isJobSaved:(job:Job)=>boolean;
  isResumeSaved:(resume:Resume)=>boolean;
}

export const ConfigContext = createContext<ConfigContextType | undefined>(
  undefined,
);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Config>({
    apiKeys: {
      ipInfoKey: import.meta.env.VITE_APP_IPINFO_TOKEN,
      deepSeekApi: import.meta.env.VITE_APP_DEEPSEEK_KEY,
      adzunaApiId: import.meta.env.VITE_APP_ADZUNA_ID,
      adzunaApiKey: import.meta.env.VITE_APP_ADZUNA_KEY,
      airtableKey:import.meta.env.VITE_APP_AIRTABLE_KEY,
      airtableBase:import.meta.env.VITE_APP_AIRTABLE_BASE
    },
    country: "sg",
    saved:{
      resumes:[],
      jobs:[],
    },
    message:""
  });
  const newMessage = (msg:string) =>{
    setConfig((prev)=>({...prev,message:msg}));
  }
  const saveJob = (job: Job) => {
    setConfig((prev) => {
      const isSaved = prev.saved.jobs.some(
        (favJob) => favJob.id === job.id
      );
      if (!isSaved) {
        newMessage("Job Saved!")
        return {
          ...prev,
          saved: {
            ...prev.saved,
            jobs: [...prev.saved.jobs, job],
          },
        };
      }
      newMessage("Job Already Saved")
      return prev;
    });
  };
  const unsaveJob = (jobRmv: Job) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      saved: {
        ...prevConfig.saved,
        jobs: prevConfig.saved.jobs.filter((job) => job.id !== jobRmv.id), 
      },
    }));
    newMessage("Job Deleted");
  };
  const saveResume = (resume: Resume) => {
    setConfig((prev) => {
      const isSaved = prev.saved.resumes.some(
        (savedResume) => savedResume.id === resume.id
      );
  
      if (!isSaved) {
        newMessage("Resume Saved!")
        return {
          ...prev,
          saved: {
            ...prev.saved,
            resumes: [...prev.saved.resumes, resume],
          },
        };
      }
      newMessage("Resume Already Saved!")
      return prev;
    });
  }
  const unsaveResume = (resumeRmv:Resume) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      saved: {
        ...prevConfig.saved,
        resumes: prevConfig.saved.resumes.filter((resume) => resume.id !== resumeRmv.id), 
      },
    }));
    newMessage("Resume Deleted!")
  };

  const isJobSaved = (job)=>{
    const isSaved = config.saved.jobs.some(
      (jobSaved) => jobSaved.id === job.id
    );
    return isSaved;
  }
  const isResumeSaved = (resume)=>{
    const isSaved = config.saved.jobs.some(
      (resumeSaved) => resumeSaved.id === resume.id
    );
    return isSaved;
  }
  return (
    <ConfigContext.Provider value={{ config, setConfig ,saveJob,unsaveJob,saveResume,unsaveResume,newMessage, isJobSaved,isResumeSaved}}>
      {children}
    </ConfigContext.Provider>
  );
};
