import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next'
import Loader from '../components/Loader/Loader';
import LeftPart from '../components/Login/LeftPart';
import { loginCardData } from '../../interview/Data/Login';
import Image from '../../../assets/register&login-icon.png'
import { Eye, EyeOff } from 'lucide-react'

const Register = () => {
  const { t } = useTranslation();

  const Navigate = useNavigate();
  const { loading, registerHandle, errMsg, setErrMsg } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerHandle(username, email, password);

      setErrMsg(data.msg || "Registration Successful");

      setTimeout(() => {
        setErrMsg("");
        Navigate('/login')
      }, 2000)

    } catch (error) {
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
    }
  }

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

          <div className="form-container">
            <h1>{t("auth.registerTitle")}</h1>

            {errMsg && (
              <div style={{
                background: "#ffe6e6",
                color: "red",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "5px"
              }}>
                {errMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="input-group">
                <label htmlFor="username">{t("auth.username")}</label>
                <input type="text" onChange={(e) => { setUsername(e.target.value) }} id='username' name='username' placeholder={t("auth.enterUsername")} required />
              </div>
              <div className="input-group">
                <label htmlFor="email">{t("auth.email")}</label>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} id='email' name='email' placeholder={t("auth.enterEmail")} required />
              </div>
              <div className="input-group">
                <label htmlFor="password">{t("auth.password")}</label>

                <div className="password-field">

                  <input type={showPass ? "text" : "password"} onChange={(e) => { setPassword(e.target.value) }} id='password' name='password' placeholder={t("auth.enterPassword")} required />
                  {
                    showPass === true ? <Eye strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPass(!showPass) }} /> : <EyeOff strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPass(!showPass) }} />
                  }

                </div>
              </div>

              <button className='button primary-button'>{t("auth.registerBtn")}</button>


            </form>
            <p>{t("auth.alreadyAccount")} <Link to='/login'>{t("auth.loginTitle")}</Link></p>
          </div>
        </div>

      </main>
    </>

  )
}

export default Register
