import React, { useState } from 'react'
import '../auth.form.scss'
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next'
import LeftPart from '../components/Login/LeftPart'
import RightPart from '../components/Login/RightPart'
import Loader from '../components/Loader/Loader'
import { loginCardData } from '../../interview/Data/Login';
import Image from '../../../assets/register&login-icon.png'

const Login = () => {

  const { t } = useTranslation();

  const { user, loading, loginHandle, googleLoginHandle, errMsg, setErrMsg } = useAuth();


  return (
    <>

      <main className='auth-main'>
        <div className="login-container">
          <LeftPart
            title1="auth.welcome"
            title2="auth.back"
            description1="auth.welDescription1"
            description2="auth.welDescription2"
            cardData={loginCardData}
            image={Image}
          />

          <RightPart t={t} loginHandle={loginHandle} googleLoginHandle={googleLoginHandle} errMsg={errMsg} setErrMsg={setErrMsg} />
        </div>
      </main>
    </>

  )
}

export default Login
