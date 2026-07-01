import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import '../../styles/Home/RecentTab.scss';
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../../auth/hooks/useAuth';

const RecentTab = ({ reports }) => {

    const { user } = useAuth()

    const [showAll, setShowAll] = useState(false)

    const navigate = useNavigate();
    const { t } = useTranslation();

    const capitalize = (text) => text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

    const displayedReports = showAll ? reports : reports.slice(0, 6);

    return (
        <div className="recent-section">

            <h2>{t("home.recentPlans.title")}</h2>

            <div className="reports-details">
                <p>
                    {capitalize(user?.userPlan || "Free")} • Reports Used:{" "}
                    {user?.reportsUsed ?? 0} / {user?.reportLimit ?? 1}
                </p>
                <button className='recent-vl-btn' onClick={() => setShowAll(!showAll)}> {showAll === false ? "View All" : "View Less"}</button>
            </div>

            <div className="recent-container">

                {
                    displayedReports?.map((report) => {
                        return (
                            <div className='recent-card' key={report._id} onClick={() => navigate(`/interview/${report._id}`)}>
                                <h4>{report.title}</h4>
                                <p>{t("home.recentPlans.generatedOn")} {new Date(report.createdAt).toLocaleDateString()}</p>

                                <span>{t("home.recentPlans.matchScore")} {" "}{report.matchScore}%</span>

                            </div>

                        )
                    })
                }
            </div>

        </div>
    )
}

export default RecentTab
