import React from 'react'
import {Check} from 'lucide-react'
import '../../styles/HowToWork/HowWorkInformation.scss'
import {useTranslation} from 'react-i18next'

const HowWorkInformation = () => {
  const {t} = useTranslation();
  return (
    <div className='howWork-container'>
      <h2 className="title">{t("howItWorks.whatYouGet")}</h2>
      <div className="information">
        <p><Check size={23} color="var(--primary)" strokeWidth={1.5} /> {t("howItWorks.technical")}</p>
        <p><Check size={23} color="var(--primary)" strokeWidth={1.5} /> {t("howItWorks.matchScore")}</p>
        <p><Check size={23} color="var(--primary)" strokeWidth={1.5} /> {t("howItWorks.skillGap")}</p>
        <p><Check size={23} color="var(--primary)" strokeWidth={1.5} /> {t("howItWorks.plan")}</p>
      </div>
    </div>
  )
}

export default HowWorkInformation
