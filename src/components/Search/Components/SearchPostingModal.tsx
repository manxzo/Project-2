import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Snippet,
  Spinner,
} from "@heroui/react";
import { HeartFilledIcon, SearchIcon } from "@/components/icons";
import {  useState } from "react";
import usePostAirtableData from "@/hooks/addAirtableRecord";
import { ConfigContext } from "@/config";
import { useContext } from "react";
import useDeleteAirtableData from "@/hooks/deleteAirtableRecord";
import debounce from "lodash.debounce";
const SearchPostingModal = ({ isOpen, onClose, selectedJob }) => {
  const context = useContext(ConfigContext);
  const {isJobSaved,findJobRecordId} = context;
  const { loading, error, postData } = usePostAirtableData("Jobs");
  const {deleteData} = useDeleteAirtableData("Jobs");

  const newJob = {
    title: selectedJob?.title,
    company: selectedJob?.company?.display_name,
    description: selectedJob?.description,
    id: selectedJob?.id,
    location: selectedJob?.location?.display_name,
    min_salary:selectedJob?.salary_min,
    max_salary:selectedJob?.salary_max,
    date_posted:selectedJob?.created
  };
  const handleSave = () => {
    isJobSaved(newJob)?deleteData(findJobRecordId(newJob)):postData(newJob);
};
 const debouncedHandleSave = debounce(handleSave,10000)
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>{selectedJob?.title || "Job Details"}</ModalHeader>

        <ModalBody>
          <p>
            <b>Company:</b> {selectedJob?.company?.display_name || "N/A"}
          </p>
          <p>
            <b>Location:</b> {selectedJob?.location?.display_name || "N/A"}
          </p>
          <p>
            <b>Salary:</b>{" "}
            {selectedJob?.salary_min ? `$${selectedJob.salary_min}` : "?"} -{" "}
            {selectedJob?.salary_max ? `$${selectedJob.salary_max}` : "?"}
          </p>
          <p>
            <b>{selectedJob?.description || "N/A"}</b>
          </p>
          <p>
            <b>Posted:</b> {selectedJob?.created || "Unknown"}
          </p>
        </ModalBody>

        <ModalFooter className="flex justify-center items-center">
          <div className="flex gap-2">
            <Popover showArrow offset={20} placement="bottom">
              <PopoverTrigger>
                <Button color="success" aria-label="Use in Resume" isIconOnly>
                  <SearchIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Snippet>
                  <pre className="whitespace-pre-wrap break-words">
                    {JSON.stringify(selectedJob)}
                  </pre>
                </Snippet>
              </PopoverContent>
            </Popover>
            <Popover onOpenChange={debouncedHandleSave}>
              <PopoverTrigger>
                <Button
                  color={isJobSaved(newJob)?"success":"danger"}
                  aria-label={isJobSaved(newJob)?"Job Saved!":"Press to Save Job!"}
                  isIconOnly
                >
                  <HeartFilledIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                {loading ? <Spinner color="danger" /> : <pre>{isJobSaved(newJob)?"Job Saved!":"Job Unsaved!"}</pre>}
              </PopoverContent>
            </Popover>

            <Button color="primary" onPress={() => onClose(false)}>
              Close
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchPostingModal;
