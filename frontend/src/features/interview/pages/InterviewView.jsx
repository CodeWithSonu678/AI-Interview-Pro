import React, { useState,useEffect } from 'react'
import '../styles/Interview/InterviewView.scss'
import LeftPart from '../components/Interview/LeftPart'
import CenterPart from '../components/Interview/CenterPart'
import RightPart from '../components/Interview/RightPart'
import { useInterview } from '../Hooks/useInterview'
import { Navigate, useParams } from 'react-router'
import Loader from '../../auth/components/Loader/Loader.jsx'

const InterviewView = () => {

    const { report, loading, interviewReportById, generateResumePdf } = useInterview();
    const [activeNav, setActiveNav] = useState('technical')
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            interviewReportById(interviewId)
        }
    }, [interviewId])



    if (!report) {
        return null;
    }

    const scoreColor =
        report?.matchScore >= 80 ? 'score--high' :
            report?.matchScore >= 60 ? 'score--mid' : 'score--low'

    return (
        <main>

            <div className="interview-container">
                <div className="i-left" >
                    <LeftPart activeNav={activeNav} setActiveNav={setActiveNav} generateResumePdf={generateResumePdf} interviewId={interviewId} report={report}/>
                </div>

                <div className="i-center">
                    <CenterPart activeNav={activeNav} report={report}/>
                </div>

                <div className="i-right interview-right">
                    <RightPart report={report}/>
                </div>
            </div>
        </main>
    )
}

export default InterviewView
