import { useEffect, useState } from "react";
import pdfToText from "react-pdftotext";
import { Button, Input, Snippet } from "@heroui/react";
const PdfResumeUploader = (props) => {
  const [resumeText, setResumeText] = useState("");
  const [file, setFile] = useState(null);

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
  }, [file,resumeText]);
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
    setFile(null);
    setResumeText("");
  };
  return (
    <div className="flex-col">
      <div className="flex gap-2 w-1/2 border p-2">
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

      {resumeText && (
        <div className="mt-4">
          <h3 className="font-bold">Extracted Resume Text:</h3>
          <Snippet
            color="default"
            className="w-2/3 h-40 border p-2 resize-none overflow-auto"
          >
            {" "}
            <pre className="whitespace-pre-wrap break-words">{resumeText}</pre>
          </Snippet>
        </div>
      )}
    </div>
  );
};

export default PdfResumeUploader;

/*return (
    <div className="p-4 border rounded-md shadow-md">
      <Input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="border p-2 w-full"
      />
      {fileName && (
        <p className="mt-2 font-semibold">Uploaded File: {fileName}</p>
      )}

      {resumeText && (
        <div className="mt-4">
          <h3 className="font-bold">Extracted Resume Text:</h3>
          <Snippet
            color
            className="w-full h-40 border p-2"
          ></Snippet>
        </div>
      )}
    </div>
  );*/
