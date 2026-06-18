import React from 'react'
import '../../styles/Pricing/PricingHeroSection.scss'
import { useTranslation } from 'react-i18next'

const PHeroSection = () => {
  const { t } = useTranslation();
  return (
    <div className='pricing-hero-section'>
      <h3>{t("pricing.title")}</h3>
      <p>{t("pricing.subtitle")}</p>
    </div>
  )
}

export default PHeroSection
