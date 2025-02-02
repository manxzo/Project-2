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
import { useState } from "react";
import usePostAirtableData from "@/hooks/addAirtableRecord";

const SearchPostingModal = ({ isOpen, onClose, selectedJob }) => {
const {success,loading,error,postData} = usePostAirtableData()

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
                <Button
                  color="danger"
                  aria-label="Add to Favourites"
                  onPress={handleFavourite}
                  isIconOnly
                >
                  <HeartFilledIcon />
                </Button>
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
