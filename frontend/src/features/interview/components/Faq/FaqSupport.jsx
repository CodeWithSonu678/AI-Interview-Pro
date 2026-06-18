import React from 'react'
import '../../styles/Faq/FaqSupport.scss'
import {useTranslation} from 'react-i18next'

const FaqSupport = () => {
  const {t} = useTranslation();
  
  return (
    <div className='faq-support'>
      <p className="first">{t("faq.supportTitle")}</p>
      <p className="second">{t("faq.supportText")}</p>
      <p className="third">{t("faq.email")}</p>
    </div>
  )
}

export default FaqSupport
