import axios from 'axios';

const api = axios.create({
    // baseURL:"https://ai-interview-pro-x39z.onrender.com",
    baseURL:"http://localhost:3000",
    withCredentials:true
});

export const generateInterviewReportApi =async ({selfDescription,jobDescription,resumeFile})=>{

    const formData = new FormData();
    formData.append("selfDescription",selfDescription);
    formData.append("jobDescription",jobDescription);
    formData.append("resume",resumeFile);
    try {
        const response = await api.post("/api/interview/",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const allInterviewReportsApi = async()=>{
    try {
        const response = await api.get("/api/interview/");
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const interviewReportByIdApi = async(interviewId)=>{
    try {
        const response = await api.get(`/api/interview/report/${interviewId}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const generateResumePdfApi = async(interviewId)=>{
    try {
        const response = await api.post(`/api/interview/resumePdf/${interviewId}`,null,{
            responseType:"blob"
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}