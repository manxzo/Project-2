import React, { createContext, useState, ReactNode } from "react";
interface apiKeys {
  ipInfoKey: string;
  deepSeekApi: string;
  adzunaApiId: string;
  adzunaApiKey: string;
  airtableKey: string;
  airtableBase: string;
}

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
  apiKeys: apiKeys;
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
  setApiKeys: (apiKeys: apiKeys) => void;
  resetToEnvApiKeys: () => apiKeys;
  saveJob: (job: Job, recordId: string) => void;
  saveResume: (resume: Resume, recordId: string) => void;
  isJobSaved: (job: Job) => boolean;
  isResumeSaved: (resume: Resume) => boolean;
  findJobRecordId: (Job: Job) => string;
  findResumeRecordId: (Resume: Resume) => string;
  removeRecord: (recordId: string) => void;
  syncData: (label: string, records: any) => void;
  findRelatedResumes: (recordId: string) => string[];
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

  const saveJob = (job: Job, recordId: string) => {
    const newRecord = { recordId: recordId, id: job.id, label: "Jobs" };
    setConfig((prev) => {
      const isSaved = prev.saved.jobs.some((favJob) => favJob.id === job.id);
      if (!isSaved) {
        return {
          ...prev,
          records: [...prev.records, newRecord],
          saved: {
            ...prev.saved,
            jobs: [...prev.saved.jobs, job],
          },
        };
      }

      return prev;
    });
  };

  const saveResume = (resume: Resume, recordId: string) => {
    const newRecord = { recordId: recordId, id: resume.id, label: "Resumes" };
    setConfig((prev) => {
      const isSaved = prev.saved.resumes.some(
        (savedResume) => savedResume.id === resume.id
      );

      if (!isSaved) {
        return {
          ...prev,
          records: [...prev.records, newRecord],
          saved: {
            ...prev.saved,
            resumes: [...prev.saved.resumes, resume],
          },
        };
      }

      return prev;
    });
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

    return findRecord ? findRecord.recordId : null;
  };

  const findResumeRecordId = (resume: Resume) => {
    const findRecord = config.records.find(
      (record) => record.label === "Resumes" && record.id === resume.id
    );
    return findRecord ? findRecord.recordId : "";
  };
  const findRelatedResumes = (recordId: string) => {
    const recordToRemove = config.records.find(
      (record) => record.recordId === recordId
    );

    if (!recordToRemove) {
      return [];
    }
    const resumesToRemove = config.saved.resumes.filter(
      (resume) => resume.job_id === recordToRemove.id
    );
    return resumesToRemove.map((resume) => findResumeRecordId(resume));
  };

  const removeRecord = (recordId: string) => {
    const recordToRemove = config.records.find(
      (record) => record.recordId === recordId
    );
    if (!recordToRemove) return;
    setConfig((prev) => ({
      ...prev,
      records: prev.records.filter((record) => record.recordId !== recordId),
      saved: {
        ...prev.saved,
        jobs:
          recordToRemove.label === "Jobs"
            ? prev.saved.jobs.filter((job) => job.id !== recordToRemove.id)
            : prev.saved.jobs,
        resumes:
          recordToRemove.label === "Resumes"
            ? prev.saved.resumes.filter(
                (resume) => resume.id !== recordToRemove.id
              )
            : prev.saved.resumes.filter(
                (resume) => resume.job_id !== recordToRemove.id
              ),
      },
    }));
  };
  const syncData = (label: string, records: any[]) => {
    setConfig((prev) => {
      const existingRecordIds = new Set(prev.records.map((r) => r.recordId));
  
      const newRecords = records
        .filter((record) => !existingRecordIds.has(record.recordId)) // Prevent duplicates
        .map(({ recordId, ...rest }) => ({
          ...rest,
        }));
  
      const updatedRecords = [
        ...prev.records,
        ...records
          .filter((record) => !existingRecordIds.has(record.recordId)) // Prevent duplicates
          .map((record) => ({
            id: record.id,
            label: label,
            recordId: record.recordId,
          })),
      ];
  
      return {
        ...prev,
        saved: {
          ...prev.saved,
          ...(label === "Jobs"
            ? { jobs: [...prev.saved.jobs, ...newRecords] }
            : { resumes: [...prev.saved.resumes, ...newRecords] }),
        },
        records: updatedRecords,
      };
    });
  };
  
  const setApiKeys = (apiKeys: apiKeys) => {
    setConfig((prev) => ({ ...prev, apiKeys: apiKeys }));
  };
  const resetToEnvApiKeys = () => {
    setConfig((prev) => ({
      ...prev,
      apiKeys: {
        ipInfoKey: import.meta.env.VITE_APP_IPINFO_TOKEN,
        deepSeekApi: import.meta.env.VITE_APP_DEEPSEEK_KEY,
        adzunaApiId: import.meta.env.VITE_APP_ADZUNA_ID,
        adzunaApiKey: import.meta.env.VITE_APP_ADZUNA_KEY,
        airtableKey: import.meta.env.VITE_APP_AIRTABLE_KEY,
        airtableBase: import.meta.env.VITE_APP_AIRTABLE_BASE,
      },
    }));
    return config.apiKeys;
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        setConfig,
        saveJob,
        saveResume,
        isJobSaved,
        isResumeSaved,
        findJobRecordId,
        findResumeRecordId,
        removeRecord,
        syncData,
        findRelatedResumes,
        setApiKeys,
        resetToEnvApiKeys,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
