import React, { useState } from 'react'
import '../auth.form.scss'
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next'
import LeftPart from '../components/Login/LeftPart'
import RightPart from '../components/Login/RightPart'
import Loader from '../components/Loader/Loader'

const Login = () => {

  const { t } = useTranslation();

  const { user, loading, loginHandle, googleLoginHandle,errMsg, setErrMsg } = useAuth();


  return (
    <>

      <main className='auth-main'>
        <div className="login-container">
          <LeftPart />

          <RightPart t={t} loginHandle={loginHandle} googleLoginHandle={googleLoginHandle} errMsg={errMsg} setErrMsg={setErrMsg}/>
        </div>
      </main>
    </>

  )
}

export default Login
