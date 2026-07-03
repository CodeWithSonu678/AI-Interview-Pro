import React, { useState, useRef, useEffect } from 'react';
import HeroSection from '../components/Home/Hero-section';
import ContentPlan from '../components/Home/Content-Plan';
import RecentTab from '../components/Home/Recent-Tab';
import { useInterview } from '../Hooks/useInterview';
import { useNavigate } from 'react-router'
import Loader from '../../auth/components/Loader/Loader.jsx'
import { useAuth } from '../../auth/hooks/useAuth.jsx';
import toast from 'react-hot-toast';

const Home = () => {

  const resumeInputRef = useRef();
  const { report, reports, loading, generateInterviewReport, allInterviewReports, interviewReportById } = useInterview();
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);

  const { user } = useAuth()

  const navigate = useNavigate();

  //handle generate btn
  const handleGenerateReport = async () => {

    if (!user) {
      toast.error("Please login to generate an interview report.");

      navigate("/login");

      return;
    }
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });

    navigate(`/interview/${data._id}`)
  }

  return (
    <main className='home'>


      <div className="main-content">
        <HeroSection />
        <ContentPlan jobDescription={jobDescription} setJobDescription={setJobDescription} selfDescription={selfDescription} setSelfDescription={setSelfDescription} resume={resume} setResume={setResume} resumeInputRef={resumeInputRef} handleGenerateReport={handleGenerateReport} />

        {user && <RecentTab reports={reports} />}

      </div>
    </main>
  )
}

export default Home
