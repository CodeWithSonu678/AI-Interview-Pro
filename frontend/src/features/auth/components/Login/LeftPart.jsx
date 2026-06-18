import React from 'react'
import { loginCardData } from '../../../interview/Data/Login'
import { useTranslation } from 'react-i18next'

const LeftPart = () => {
  const { t } = useTranslation();
  return (
    <div className='login-left'>

      <div className='login-left-container'>



        {/* title section here */}

        <div className="login-title-section">
          <h2 className='welTitle'>{t("auth.welcome")} <span className='backTitle'>{t("auth.back")}</span></h2>
          <p className="login-description">{t("auth.welDescription1")} <br />{t("auth.welDescription2")}</p>
        </div>

        {/* Cards code here */}

        <div className="login-properties">

          {
            loginCardData.map(item => {
              const Icon = item.icon;
              return (
                <div className="property" key={item.id}>
                  <span className="p-icon"><Icon /></span>
                  <p className="p-title">{t(item.title)}</p>
                </div>
              )
            })
          }
        </div>

      </div>

    </div>
  )
}

export default LeftPart
