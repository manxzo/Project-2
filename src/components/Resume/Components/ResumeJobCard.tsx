import { Card, CardBody } from "@heroui/react";
const ResumeJobCard = ({ displayJob, setJob, job }) => {
  const isJobSet = displayJob?.id === job?.id;

  return (
    <Card
      isPressable
      shadow="sm"
      onPress={() => isJobSet?setJob():setJob(displayJob)}
      className={`border-2 w-full h-[120px] p-3 
        ${isJobSet ? "bg-green-300 dark:bg-green-700" : "bg-gray-100 dark:bg-gray-800"}
      `}
      
    >
      <CardBody className="overflow-visible p-0">
        <b>{displayJob.title}</b>
        <p className="text-700">{displayJob.company}</p>
        <p className="text-default-500">
          <b> {displayJob.location}</b>
        </p>
      </CardBody>
    </Card>
  );
};
export default ResumeJobCard;
