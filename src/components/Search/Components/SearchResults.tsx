// @ts-nocheck
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Skeleton,
} from "@heroui/react";
import { useState } from "react";

const SearchResult = ({ results, resultCount }) => {
  const loadingDisplayArray = Array(25).fill(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedJob, setSelectedJob] = useState(null);

  const handlePopUp = (job) => {
    setSelectedJob(job);
    onOpen();
  };
  if (results.length > 0) {
    return (
      <div>
        <h4>Total Number of Results: {resultCount}</h4>
        <div className="gap-2 grid grid-cols-4 sm:grid-cols-5 ">
          {results.map((posting) => (
            <Card
              className="border-2 bg-background-100/50 dark:bg-default-100/50 max-w-[610px] h-[180px] p-3"
              key={posting.id}
              isPressable
              shadow="sm"
              onPress={() => {
                handlePopUp(posting);
              }}
            >
              <CardBody className="overflow-visible text-center p-0 justify-center">
                <b>{posting.title}</b>
                <p className="text-700">{posting.label}</p>
                <p className="text-default-500">
                  {posting.location.display_name}
                </p>
                <p>{`$${posting.salary_min ? posting.salary_min : "?"}-$${posting.salary_max ? posting.salary_max : "?"}`}</p>
              </CardBody>
              <CardFooter className="text-small justify-center">
                <b>{posting.created}</b>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader>{selectedJob?.title || "Job Details"}</ModalHeader>
            <ModalBody>
              <p>
                <b>Company:</b> {selectedJob?.label || "N/A"}
              </p>
              <p>
                <b>Location:</b> {selectedJob?.location?.display_name || "N/A"}
              </p>
              <p>
                <b>Salary:</b>{" "}
                {selectedJob?.salary_min ? `$${selectedJob.salary_min}` : "?"} -{" "}
                {selectedJob?.salary_max ? `$${selectedJob.salary_max}` : "?"}
              </p>
              <p><b>{selectedJob?.description?.description || "N/A"}</b></p>
              <p>
                <b>Posted:</b> {selectedJob?.created || "Unknown"}
              </p>
            </ModalBody>
            <ModalFooter>
            
              <Button color="primary" onPress={onOpenChange}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {loadingDisplayArray.map((x, index) => {
          return (
            <Card isPressable shadow="sm" key={index}>
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                </Skeleton>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
};
export default SearchResult;
