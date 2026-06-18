import React from 'react'
import {useTranslation} from 'react-i18next'

const HowWorkHeroSection = () => {
  const {t} = useTranslation();
  return (
    <div className='hero-section'>
      <h2>{t("howItWorks.title")} <span className='h-model'>{t("howItWorks.highlight")}</span></h2>
      <p>{t("howItWorks.subtitle")} </p>
    </div>
  )
}

export default HowWorkHeroSection
