/*
const SearchResults = (props) =>{
const resultStyle = {
        container: {
          padding: "16px",
        },
        message: {
          fontSize: "1.25rem",
          fontWeight: "600",
          marginBottom: "16px",
        },
        grid: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        },
        card: {
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          padding: "16px",
          border: "1px solid #e0e0e0",
          transition: "box-shadow 0.3s ease-in-out",
        },
        title: {
          fontSize: "1.125rem",
          fontWeight: "bold",
          color: "#333",
        },
        company: {
          fontSize: "0.875rem",
          color: "#666",
        },
        location: {
          fontSize: "0.875rem",
          color: "#999",
        
        },
      };
      const message = props.message;
      const results = props.results;
      const resultCount = props.resultCount;
      return (
        <div style={resultStyle.container}>
          {message && <h4 style={resultStyle.message}>{message}</h4>}
          {resultCount>0 ? <h4 style={resultStyle.message}>Search Results:{resultCount}</h4>:<h4>Nothing to see here...</h4>}
        
          <div style={resultStyle.grid}>

            {results.map((result) => (
              <div key={result.id} style={resultStyle.card}>
                <h4 style={resultStyle.title}>{result.title}</h4>
                <h5 style={resultStyle.company}>{result.company.display_name}</h5>
                <h5 style={resultStyle.location}>{result.location.display_name}</h5>
              </div>
            ))}
          </div>
        </div>
      );
}
export default SearchResults;
*/
import { useState } from "react";

const SearchResults = (props) => {
  const [selectedJob, setSelectedJob] = useState(null); 
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); 

  const openOverlay = (job) => {
    setSelectedJob(job); 
    setIsOverlayOpen(true); 
  };

  const closeOverlay = () => {
    setSelectedJob(null);
    setIsOverlayOpen(false);
  };

  const resultStyle = {
    container: { padding: "16px" },
    message: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" },
    card: {
      backgroundColor: "white",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      padding: "16px",
      border: "1px solid #e0e0e0",
      transition: "box-shadow 0.3s ease-in-out",
      cursor: "pointer",
    },
    title: { fontSize: "1.125rem", fontWeight: "bold", color: "#333" },
    company: { fontSize: "0.875rem", color: "#666" },
    location: { fontSize: "0.875rem", color: "#999" },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      width: "80%",
      maxWidth: "500px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "15px",
      background: "red",
      color: "white",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
      borderRadius: "5px",
    },
  };

  return (
    <div style={resultStyle.container}>
      {props.message && <h4 style={resultStyle.message}>{props.message}</h4>}
      {props.resultCount > 0 ? (
        <h4 style={resultStyle.message}>Search Results: {props.resultCount}</h4>
      ) : (
        <h4>Nothing to see here...</h4>
      )}

      <div style={resultStyle.grid}>
        {props.results.map((result) => (
          <div key={result.id} style={resultStyle.card} onClick={() => openOverlay(result)}>
            <h4 style={resultStyle.title}>{result.title}</h4>
            <h5 style={resultStyle.company}>{result.company?.display_name || "Unknown Company"}</h5>
            <h5 style={resultStyle.location}>{result.location?.display_name || "N/A"}</h5>
          </div>
        ))}
      </div>
      {isOverlayOpen && selectedJob && (
        <div style={resultStyle.modalOverlay} onClick={closeOverlay}>
          <div style={resultStyle.modal} onClick={(e) => e.stopPropagation()}>
            <button style={resultStyle.closeButton} onClick={closeOverlay}>X</button>
            <h2>{selectedJob.title}</h2>
            <p><strong>Company:</strong> {selectedJob.company?.display_name || "N/A"}</p>
            <p><strong>Category:</strong> {selectedJob.category?.label || "N/A"}</p>
            <p><strong>Location:</strong> {selectedJob.location?.display_name || "N/A"}</p>
            <p><strong>Contract Type:</strong> {selectedJob.contract_time || "Not specified"}</p>
            <p><strong>Salary:</strong> {selectedJob.salary_min ? `$${selectedJob.salary_min} - $${selectedJob.salary_max}` : "Not specified"}</p>
            <p><strong>Description:</strong> {selectedJob.description}</p>
            <a href={selectedJob.redirect_url} target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
