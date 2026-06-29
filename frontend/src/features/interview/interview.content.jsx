import {Children, createContext,useState} from 'react';

export const InterviewContent = createContext();

export const InterviewProvider = ({children})=>{
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Please wait.....")

    return (
        <InterviewContent.Provider value={{report,setReport,reports,setReports,loading,setLoading,loadingMessage,setLoadingMessage}}>
            {children}
        </InterviewContent.Provider>
    )
}
