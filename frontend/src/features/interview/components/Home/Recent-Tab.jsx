import React from 'react'
import {useNavigate} from 'react-router'
import '../../styles/Home/RecentTab.scss';
import {useTranslation} from 'react-i18next'

const RecentTab = ({reports}) => {

    const navigate = useNavigate();
    const {t} = useTranslation();
    return (
        <div className="recent-section">

            <h2>{t("home.recentPlans.title")}</h2>

            <div className="recent-container">

                {
                    reports?.map((report) => {
                        return(
                        <div className='recent-card' key={report._id} onClick={()=>navigate(`/interview/${report._id}`)}>
                            <h4>{report.title}</h4>
                            <p>{t("home.recentPlans.generatedOn")} {new Date(report.createdAt).toLocaleDateString()}</p>

                            <span>{t("home.recentPlans.matchScore")} {" "}{report.matchScore}%</span>

                        </div>

                    )})
                }
            </div>

        </div>
    )
}

export default RecentTab
