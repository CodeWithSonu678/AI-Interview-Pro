import { useContext, useEffect } from 'react';
import { generateInterviewReportApi, allInterviewReportsApi, interviewReportByIdApi, generateResumePdfApi } from '../services/interview.api';
import { InterviewContent } from '../interview.content';
import { useParams } from 'react-router'
import toast from 'react-hot-toast';

export const useInterview = () => {
    const content = useContext(InterviewContent);

    if (!content) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    const { report, setReport, reports, setReports, loading, setLoading } = content;
    const { interviewId } = useParams();

    const generateInterviewReport = async ({ selfDescription, jobDescription, resumeFile }) => {
        setLoading(true)
        try {
            const data = await generateInterviewReportApi({ selfDescription, jobDescription, resumeFile });

            setReport(data.interviewReport)
            toast.success("Interview report generated successfully");
            return data.interviewReport;
        } catch (error) {
            if (error?.response?.status === 503) {
                toast.error(
                    "AI server is busy right now. Please try again later."
                );
            } else {
                toast.error(
                    error?.response?.data?.message ||
                    "Failed to generate interview report"
                );
            }

            return null;
        } finally {
            setLoading(false)
        }
    }

    const allInterviewReports = async () => {
        setLoading(true)
        try {
            const data = await allInterviewReportsApi();
            setReports(data.interviewReports || [])
        } catch (error) {
            toast.error(
                error?.response?.data?.msg ||
                "Failed to fetch interview reports"
            );

            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const interviewReportById = async (interviewId) => {
        setLoading(true)
        try {
            const data = await interviewReportByIdApi(interviewId);
            setReport(data.interviewReport)
        } catch (error) {
            if (error?.response?.status === 404) {
                toast.error("Interview report not found");
            } else {
                toast.error(
                    error?.response?.data?.msg ||
                    "Failed to fetch report"
                );
            }

            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const generateResumePdf = async (interviewId) => {
        setLoading(true)
        try {
            const response = await generateResumePdfApi(interviewId);

            /* Browser ka special object.
             Raw binary data ko:
             file format me convert karta hai.
             */

            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewId}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove();

            window.URL.revokeObjectURL(url);
            toast.success("Resume downloaded successfully");

        } catch (error) {
            if (error?.response?.status === 404) {
                toast.error("Interview report not found");
            } else {
                toast.error(
                    error?.response?.data?.msg ||
                    "Failed to generate PDF"
                );
            }

            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            interviewReportById(interviewId)
        } else {
            allInterviewReports()
        }
    }, [interviewId])

    return { report, reports, loading, generateInterviewReport, allInterviewReports, interviewReportById, generateResumePdf }
}