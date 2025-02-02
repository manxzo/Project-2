import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { HeartFilledIcon } from "@/components/icons";

const SearchPostingModal = ({ isOpen, onClose, selectedJob}) => {
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

        <ModalFooter className="flex justify-between items-center">
          {selectedJob?.redirect_url && (
            <a
              href={selectedJob.redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              See Full Posting
            </a>
          )}

          <div className="flex gap-2">
            <Button
              color="danger"
              aria-label="Add to Favourites"
              isIconOnly
            >
              <HeartFilledIcon />
            </Button>
            <Button color="primary" onPress={()=>onClose(false)}>
              Close
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchPostingModal;
