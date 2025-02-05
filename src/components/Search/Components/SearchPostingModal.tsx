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
} from "@heroui/react";
import { HeartFilledIcon, SearchIcon } from "@/components/icons";

import usePostAirtableData from "@/hooks/addAirtableRecord";
import { ConfigContext } from "@/config";
import { useContext } from "react";
import useDeleteAirtableData from "@/hooks/deleteAirtableRecord";
import { ExternalLink } from "react-external-link";
const SearchPostingModal = ({ isOpen, onClose, selectedJob }) => {
  const context = useContext(ConfigContext);
  const { isJobSaved, findJobRecordId } = context;
  const { loading, postData } = usePostAirtableData("Jobs");
  const { deleteData, loading: loadingDel } = useDeleteAirtableData("Jobs");

  const newJob = {
    title: selectedJob?.title,
    company: selectedJob?.company?.display_name,
    description: selectedJob?.description,
    id: selectedJob?.id,
    location: selectedJob?.location?.display_name,
    min_salary: selectedJob?.salary_min,
    max_salary: selectedJob?.salary_max,
    date_posted: selectedJob?.created,
    link: selectedJob?.redirect_url,
  };
  const handleSave = () => {
    const jobRecordId = findJobRecordId(newJob);
    isJobSaved(newJob) ? deleteData(jobRecordId) : postData(newJob);
  };

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
                  <p className="whitespace-pre-wrap break-words">
                    {JSON.stringify(selectedJob)}
                  </p>
                </Snippet>
              </PopoverContent>
            </Popover>

            <Button
              color={isJobSaved(newJob) ? "success" : "danger"}
              isIconOnly
              disabled={loading || loadingDel}
              isLoading={loading || loadingDel}
              onPress={handleSave}
            >
              <HeartFilledIcon />
            </Button>

            <Button color="primary">
              <ExternalLink href={selectedJob?.redirect_url}>
                Visit Posting
              </ExternalLink>
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchPostingModal;
