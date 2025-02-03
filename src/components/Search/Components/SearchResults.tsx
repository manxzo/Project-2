// @ts-nocheck
import { Card, Spinner } from "@heroui/react";
import { useState } from "react";
import SearchPostingCard from "./SearchPostingCard";
import SearchPostingModal from "./SearchPostingModal";

const SearchResult = ({ results, resultCount ,loading}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  return (
    <div>
      <h4>Total Number of Results: {resultCount}</h4>
      {loading?<div className="flex justify-center items-center h-40"><Spinner size="lg"/></div>:
      <div className="gap-2 grid grid-cols-4 sm:grid-cols-4 ">
        {results.map((posting)=>{return <SearchPostingCard key ={posting.id} posting={posting} onClick={handleJobClick}/>})}
      </div>}
      <SearchPostingModal isOpen={isModalOpen} onClose={setIsModalOpen} selectedJob={selectedJob}/>
    </div>
  );
};

export default SearchResult;
