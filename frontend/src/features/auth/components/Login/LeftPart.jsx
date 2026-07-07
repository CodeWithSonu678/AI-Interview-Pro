import React from 'react'
import { loginCardData } from '../../../interview/Data/Login'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const LeftPart = ({ title1, title2, description1, description2, cardData, image,back }) => {
  const { t } = useTranslation();

  return (
    <div className="login-left">
      <div className="login-left-container">

        {image && (
          <div className="left-image">
            <img src={image} alt="illustration" />
          </div>
        )}

        <div className="login-title-section">
          <h2 className="welTitle">
            {t(title1)} <span className="backTitle">{t(title2)}</span>
          </h2>

          <p className="login-description">
            {t(description1)}
            {description2 && (
              <>
                <br />
                {t(description2)}
              </>
            )}
          </p>
        </div>

        <div className="login-properties">
          {cardData.map((item) => {
            const Icon = item.icon;

            return (
              <div className="property" key={item.id}>
                <span className="p-icon">
                  <Icon />
                </span>
                <p className="p-title">{t(item.title)}</p>
              </div>
            );
          })}
        </div>

        {/* back btn code here */}

        {
          back && (
            <>
              <div className="back-btn">
                <ArrowLeft /> Back to <Link to={'/login'}>Login</Link>
              </div>
            </>
          )
        }

      </div>
    </div>
  );
};

export default LeftPart
