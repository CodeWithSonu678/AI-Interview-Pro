import React from 'react'
import { stepsData } from '../../Data/HowWorks'
import '../../styles/HowToWork/HowWorkCards.scss'
import {useTranslation} from 'react-i18next'

const HowWorkCards = () => {
  const {t} = useTranslation();
  return (
    <div className='container'>
      {
        stepsData.map(step => {
          let Icon = step.icon;
          return (
            <div className="cards" key={step.id}>

              <div className="icon-wrapper">

                <div className="icon">
                  <Icon size={35} color="var(--primary)" />
                </div>

                <div className="number">
                  {step.id}
                </div>

              </div>

              <h3 className="title">{t(step.title)}</h3>

              <p className="description">
                {t(step.description)}
              </p>

            </div>
          )
        })
      }
    </div>
  )
}

export default HowWorkCards
