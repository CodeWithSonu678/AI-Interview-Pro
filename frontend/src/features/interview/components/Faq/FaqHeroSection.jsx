import React from 'react'
import '../../styles/Faq/FaqHeroSection.scss'
import {useTranslation} from 'react-i18next'

const FaqHeroSection = () => {
  const {t} = useTranslation();
  return (
    <div className='hero-section'>
      <h2>{t("faq.title1")} <span className='h-model'>{t("faq.title2")}</span></h2>
      <p>{t("faq.subtitle")}</p>
    </div>
  )
}

export default FaqHeroSection
