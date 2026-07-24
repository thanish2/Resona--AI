import { useContext, useEffect, useState } from "react"
import {
  getInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf
} from "../services/interview.api";
import { InterviewContext } from "../interview.context";
import { useParams, useNavigate } from "react-router";


export const useInterview=()=>{
    const context=useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be within a InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports }=context;

    const generateReport=async({jobDescription ,selfDescription,resumeFile})=>{
        setLoading(true);
        let response=null;
        try{
             response=await generateInterviewReport({jobDescription ,selfDescription,resumeFile});
            setReport(response.interviewReport);
        }catch(error){
            console.log(error);
            throw error;
            
        }finally{
            setLoading(false);
        }
        return response.interviewReport
    }

    const getReportById=async(interviewId)=>{
        setLoading(true);
        let response=null;
        try{
             response=await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
        }catch(error){
            console.log(error);
            throw error;
        }finally{
            setLoading(false);
        }
        return response.interviewReport
    }

    const getReports=async()=>{
        setLoading(true);
        let response=null;
        try{
             response = await getInterviewReports();
            setReports(response.interviewReports);
        }catch(error){
            console.log(error);
            throw error;
        }finally{
            setLoading(false);
        }
        return response.interviewReports
    }

    const [resumeLoading, setResumeLoading] = useState(false);

    const getResumePdf = async ({ interviewReportId }) => {
      setResumeLoading(true);
      try {
        const response = await generateResumePdf({ interviewReportId });
        const url = window.URL.createObjectURL(
          new Blob([response], { type: "application/pdf" }),
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `resume_${interviewReportId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setResumeLoading(false);
      }
    };

    const navigate = useNavigate();
    const { interviewId } = useParams();

     useEffect(() => {
       if (interviewId) {
         getReportById(interviewId).catch(() => {
           navigate("/", {
             replace: true,
             state: {
               error:
                 "That interview report couldn't be found. It may have been deleted or the link is incorrect.",
             },
           });
         });
       } else {
         getReports();
       }
     }, [interviewId]);

    return {
      loading,
      report,
      reports,
      resumeLoading,
      generateReport,
      getReportById,
      getReports,
      getResumePdf
    };
}

