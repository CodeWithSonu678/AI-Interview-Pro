import {Children, createContext,useState} from 'react';

export const InterviewContent = createContext();

export const InterviewProvider = ({children})=>{
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <InterviewContent.Provider value={{report,setReport,reports,setReports,loading,setLoading}}>
            {children}
        </InterviewContent.Provider>
    )
}
