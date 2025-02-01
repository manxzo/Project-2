import { useEffect, useState } from "react";
import pdfToText from "react-pdftotext";
import { Button, Input } from "@heroui/react";
const ResumeUploader = ({ setResume }) => {
  const [resumeText, setResumeText] = useState("");
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
    setFile(selectedFile);
  };
  const handleClear = () => {
    setResumeText("");
  };
  const handleSubmit = () => {
    if (!resumeText.trim()) {
      alert("Please enter or upload a resume before submitting.");
      return;
    }
    setResume(resumeText);
  };
  return (
    <div className="flex-col content-stretch flex-auto h-full">
      <div className="flex gap-2 border p-3 h-1/8">
        <Input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="flex-2"
          color="secondary"
        />
        <Button
          className=" flex-1 self-center"
          color="primary"
          type="button"
          onPress={handleClear}
        >
          Clear
        </Button>
      </div>
      <div className="h-3/4">
        <textarea
          color="default"
          value={resumeText}
          onChange={(event) => setResumeText(event.target.value)}
          placeholder="Paste or edit resume text here..."
          className="h-full w-full p-4 border rounded-md dark:text-white dark:border-gray-600 placeholder-gray-400 "
        />
      </div>
      <div className="flex gap-2 border p-3 h-1/8">
        <Button color="success" onPress={handleSubmit} className="w-1/2">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ResumeUploader;
