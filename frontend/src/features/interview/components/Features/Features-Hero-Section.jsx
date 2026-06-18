import React from 'react'
import '../../styles/Features/FHeroSection.scss'
import {useTranslation} from 'react-i18next'

const FHeroSection = () => {

  const {t} = useTranslation();

  return (
    <div className='feature-hero-section'>
      <h2>{t("featuresPage.title")}</h2>
      <h2 className='design'>{t("featuresPage.highlight")}</h2>
      <p>{t("featuresPage.subtitle1")}<br /> {t("featuresPage.subtitle2")}</p>
    </div>
  )
}

export default FHeroSection
