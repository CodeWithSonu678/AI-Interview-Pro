import React from 'react'
import '../../styles/Features/FeaturesCards.scss'
import {useTranslation} from 'react-i18next'

const AllFeatures = ({features}) => {
  
  const {t} = useTranslation();

  return (
    <>
      <div className="features-container">
        {features.map(feature =>{
            return (
              
                <div className='feature-cards' key={feature.id}>
                  <div className="feature-logo"><feature.icon className="feature-icon" size={22}/></div>
                  <div className="title">{t(feature.title)}</div>
                  <div className="description">{t(feature.description)}</div>
                </div>
            )
          })}
      </div>
    </>
  )
}

export default AllFeatures
