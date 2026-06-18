import React from 'react'
import '../../styles/Home/HeroSection.scss'
import {useTranslation} from 'react-i18next'

const HeroSection = () => {
  const {t} = useTranslation();
  return (
    <div className='hero-section'>
      <h2>{t("home.title")} <span className='h-model'>{t("home.highlight")}</span></h2>
      <p>{t("home.subtitle")} </p>
    </div>
  )
}

export default HeroSection
