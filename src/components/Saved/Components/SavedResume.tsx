import {
    Accordion,
    AccordionItem,
    
  } from "@heroui/react";

const SavedResume = ({jobs,resumes}) =>{
const mappedJobs = jobs.map((job)=>{
  return {
    ...job,resumes:resumes.filter((resume)=>resume.job_id===job.id)
  }
}) 

return (
  <Accordion>
    {mappedJobs.map((job) => 
      job.resumes.length > 0 && (
        <AccordionItem key={job.id} title={job.title} subtitle={job.company}>
          {job.resumes.map((resume,index) => (
            <div key={resume.id} className="p-2">
              <h3>Resume {index}- id:{resume.id}</h3>
              <p className="whitespace-pre-wrap break-words">{resume.text}</p>
            </div>
          ))}
        </AccordionItem>
      )
    )}
  </Accordion>
);


                    }
export default SavedResume;