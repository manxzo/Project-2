import DefaultLayout from "@/layouts/default";
import ResumeResult from "./Components/ResumeResult";
import ResumeUpload from "./Components/ResumeUploadText";
import PdfResumeUploader from "./Components/ResumeUploadPDF";
const Resume = () => {
return(
    <DefaultLayout>
     <PdfResumeUploader/>   
    </DefaultLayout>
)
}
export default Resume;