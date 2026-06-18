import React,{useState} from 'react';
import '../../styles/Home/Plan-Section.scss';
import { BriefcaseConveyorBelt, User, CloudUpload, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next'

const ContentPlan = ({ jobDescription, setJobDescription, selfDescription, setSelfDescription, resume, setResume, resumeInputRef, handleGenerateReport }) => {

    const [resumeFile, setResumeFile] = useState(null);
    const { t } = useTranslation();
    return (
        <section className='plan-section'>
            <div className='plan-container'>
                {/* left part */}
                <div className="job-section">
                    <div className="job-title-container">
                        <div className="job-logo">
                            <BriefcaseConveyorBelt size={21} color="var(--card-border-hover)" absoluteStrokeWidth />
                            <h3>{t("home.jobDescription")} </h3>
                        </div>
                        <span>{t("home.required")}</span>
                    </div>

                    {/* Textarea section */}
                    <div className="textarea-box">
                        <textarea name="jodDescription" id="jodDescription" placeholder="paste the full job description here... e.g. 'Senior Frontend Engineer at Google requires proficiency in React, typeScrip, and large-scale system design...'" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required>

                        </textarea>
                        <p>0/5000 chars</p>
                    </div>
                </div>
                {/* right part */}
                <div className="profile-section">
                    <div className="profile-logo">
                        <User size={22} color="var(--card-border-hover)" strokeWidth={1.75} absoluteStrokeWidth />
                        <h4>{t("home.profile")}</h4>
                    </div>

                    {/* upload section */}
                    <div className="upload-section">
                        <div className="upload-top">
                            <h4>{t("home.uploadResume")}</h4>
                            <span>{t("home.bestResults")}</span>
                        </div>

                        <div className={`upload-box ${resumeFile ? "uploaded" : ""}`}>
                            <input type="file" id='resumeUpload' name='resumeUpload' hidden ref={resumeInputRef} accept='.pdf' onChange={(e) => {
                                setResumeFile(e.target.files[0]);
                            }} />

                            <label htmlFor="resumeUpload">
                                <CloudUpload size={50} color="var(--card-border-hover)" strokeWidth={1.75} absoluteStrokeWidth />

                                {
                                    resumeFile ? (
                                        <>
                                            <p className="upload-hint">
                                                ✅ {resumeFile.name}
                                            </p>

                                            <p className="upload-size">
                                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className='upload-hint'>
                                                {t("home.uploadText")}
                                            </p>

                                            <p className='upload-size'>
                                                {t("home.pdf")}
                                            </p>
                                        </>
                                    )
                                }
                            </label>
                        </div>
                    </div>

                    {/* divider */}
                    <div className="divider">
                        <span>{t("home.or")}</span>
                    </div>

                    {/* self-description */}
                    <div className="self-description">
                        <h4>{t("home.selfDescription")}</h4>
                        <textarea name="selfDescription" id="selfDescription" placeholder={t("home.selfDescriptionPlaceholder")} value={selfDescription} onChange={(e) => setSelfDescription(e.target.value)}></textarea>
                    </div>

                    <div className="info-section">
                        <span className='info-icon'>i</span>
                        <p>
                            {t("home.note1")} <span className='info-model'>{t("home.note2")}</span> {t("home.note3")} <span className='info-model'>{t("home.note4")}</span> {t("home.note5")}
                        </p>
                    </div>
                </div>

            </div>


            {/* bottom part */}
            <div className="bottom-section">
                <p>{t("home.generationTime")} </p>
                <button className="generate-btn" onClick={handleGenerateReport}>
                    <Star size={21} color="white" strokeWidth={1.75} absoluteStrokeWidth />
                    {t("home.generateBtn")}
                </button>
            </div>

        </section>
    )
}

export default ContentPlan
