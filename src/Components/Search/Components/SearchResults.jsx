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
      return (
        <div style={resultStyle.container}>
          {message && <h4 style={resultStyle.message}>{message}</h4>}
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