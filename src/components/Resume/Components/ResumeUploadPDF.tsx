import { useEffect, useState } from "react";
import pdfToText from "react-pdftotext";

const PdfResumeUploader = () => {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    const extractText = async () => {
      try {
        const converted = await pdfToText(file);
        setResumeText(converted.trim());
      } catch (error) {
        console.error("Failed to extract text from pdf");
      }
    };
    extractText();
  }, [file]);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }
    setFileName(selectedFile.name);
    setFile(selectedFile);
  };

  
};

export default PdfResumeUploader;
