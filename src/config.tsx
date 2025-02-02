import React, { createContext, useState, ReactNode } from "react";

interface Job {
  title: string;
  company: string;
  description: string;
  id: string;
  location: string;
  min_salary: string;
  max_salary: string;
  date_posted: string;
}
interface Resume {
  id: string;
  text: string;
  job_id: string;
}
interface Record {
  recordId: string;
  label: string;
  id: string;
}

interface Config {
  apiKeys: {
    ipInfoKey: string;
    deepSeekApi: string;
    adzunaApiId: string;
    adzunaApiKey: string;
    airtableKey: string;
    airtableBase: string;
  };
  country: string;
  saved: {
    resumes: Resume[];
    jobs: Job[];
  };
  records: Record[];
}

interface ConfigContextType {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  saveJob: (job: Job) => void;
  unsaveJob: (job: Job) => void;
  saveResume: (resume: Resume) => void;
  unsaveResume: (resume: Resume) => void;
  isJobSaved: (job: Job) => boolean;
  isResumeSaved: (resume: Resume) => boolean;
  findJobRecordId: (Job: Job) => string;
  findResumeRecordId: (Resume: Resume) => string;
  addJobRecord: (job: Job, recordId: string) => void;
  addResumeRecord: (resume: Resume, recordId: string) => void;
  removeRecord: (recordId: string) => void;
  syncData:(label:string,records:any)=> void;
}

export const ConfigContext = createContext<ConfigContextType | undefined>(
  undefined
);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Config>({
    apiKeys: {
      ipInfoKey: import.meta.env.VITE_APP_IPINFO_TOKEN,
      deepSeekApi: import.meta.env.VITE_APP_DEEPSEEK_KEY,
      adzunaApiId: import.meta.env.VITE_APP_ADZUNA_ID,
      adzunaApiKey: import.meta.env.VITE_APP_ADZUNA_KEY,
      airtableKey: import.meta.env.VITE_APP_AIRTABLE_KEY,
      airtableBase: import.meta.env.VITE_APP_AIRTABLE_BASE,
    },
    country: "sg",
    saved: {
      resumes: [],
      jobs: [],
    },
    records: [],
  });

  const saveJob = (job: Job) => {
    setConfig((prev) => {
      const isSaved = prev.saved.jobs.some((favJob) => favJob.id === job.id);
      if (!isSaved) {
        return {
          ...prev,
          saved: {
            ...prev.saved,
            jobs: [...prev.saved.jobs, job],
          },
        };
      }

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
  };
  const saveResume = (resume: Resume) => {
    setConfig((prev) => {
      const isSaved = prev.saved.resumes.some(
        (savedResume) => savedResume.id === resume.id
      );

      if (!isSaved) {
        return {
          ...prev,
          saved: {
            ...prev.saved,
            resumes: [...prev.saved.resumes, resume],
          },
        };
      }

      return prev;
    });
  };
  const unsaveResume = (resumeRmv: Resume) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      saved: {
        ...prevConfig.saved,
        resumes: prevConfig.saved.resumes.filter(
          (resume) => resume.id !== resumeRmv.id
        ),
      },
    }));
  };

  const isJobSaved = (job: Job) => {
    const isSaved = config.saved.jobs.some(
      (jobSaved) => jobSaved.id === job.id
    );
    return isSaved;
  };
  const isResumeSaved = (resume: Resume) => {
    const isSaved = config.saved.resumes.some(
      (resumeSaved) => resumeSaved.id === resume.id
    );
    return isSaved;
  };
  const findJobRecordId = (job: Job) => {
    const findRecord = config.records.find(
      (record) => record.label === "Jobs" && record.id === job.id
    );
    return findRecord ? findRecord.recordId : "";
  };
  const findResumeRecordId = (resume: Resume) => {
    const findRecord = config.records.find(
      (record) => record.label === "Resumes" && record.id === resume.id
    );
    return findRecord ? findRecord.recordId : "";
  };
  
  const addJobRecord = (job: Job, recordId: string) => {
    const newRecord = { id: job.id, recordId: recordId, label: "Jobs" };
    setConfig((prev) => ({ ...prev, records: [...prev.records, newRecord] }));
  };
  const addResumeRecord = (resume: Resume, recordId: string) => {
    const newRecord = { id: resume.id, recordId: recordId, label: "Resumes" };
    setConfig((prev) => ({ ...prev, records: [...prev.records, newRecord] }));
  };
  const removeRecord = (recordId: string) => {
    const recordToRemove = config.records.find((record) => record.recordId === recordId);
    if (!recordToRemove) return;
  
    setConfig((prev) => ({
      ...prev,
      records: prev.records.filter((record) => record.recordId !== recordId),
      saved: {
        ...prev.saved,
        jobs: recordToRemove.label === "Jobs"
          ? prev.saved.jobs.filter((job) => job.id !== recordToRemove.id)
          : prev.saved.jobs,
        resumes: recordToRemove.label === "Resumes"
          ? prev.saved.resumes.filter((resume) => resume.id !== recordToRemove.id)
          : prev.saved.resumes,
      },
    }));
  };
  const syncData = (label,records)=>{
    const newData = records.map((record)=>record.fields)
    if(label==="Jobs"){
      setConfig((prev)=>({...prev,...prev.saved,jobs:newData}))
    }
    if(label==="Resumes"){
      setConfig((prev)=>({...prev,...prev.saved,resumes:newData}))
    }
  }
  return (
    <ConfigContext.Provider
      value={{
        config,
        setConfig,
        saveJob,
        unsaveJob,
        saveResume,
        unsaveResume,
        isJobSaved,
        isResumeSaved,
        findJobRecordId,
        findResumeRecordId,
        addJobRecord,
        addResumeRecord,
        removeRecord,
        syncData
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
