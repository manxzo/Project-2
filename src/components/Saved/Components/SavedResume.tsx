import { Accordion, AccordionItem } from "@heroui/react";

const SavedResume = ({ jobs, resumes }) => {
  const mappedJobs = jobs.map((job) => {
    return {
      ...job,
      resumes: resumes.filter((resume) => resume.job_id === job.id),
    };
  });

  return (
    <div className="mt-8 text-center">
      <pre style={{ fontSize: "24px", textDecoration: "underline" }}>
        Resumes Created
      </pre>
      {resumes.length === 0 ? (
        <pre className="mt-5">No saved resumes!</pre>
      ) : (
        <Accordion>
          {mappedJobs.map(
            (job) =>
              job.resumes.length > 0 && (
                <AccordionItem
                  key={job.id}
                  title={job.title}
                  subtitle={`Resumes Created:${resumes.length}`}
                >
                  {job.resumes.map((resume, index) => (
                    <div key={resume.id} className="p-2 text-left">
                      <h3>
                        Resume {index + 1}- Created on:{resume.id}
                      </h3>
                      <p className="whitespace-pre-wrap break-words">
                        {resume.text}
                      </p>
                    </div>
                  ))}
                </AccordionItem>
              )
          )}
        </Accordion>
      )}
    </div>
  );
};
export default SavedResume;
