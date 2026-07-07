import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router';
import toast from "react-hot-toast";
import {ShieldCheck} from 'lucide-react'
import '../../styles/Forgot/ForgotRightPart.scss'

const ForgotRightPart = ({ t, errMsg, setErrMsg,ForgotPasswordHandle }) => {

    const [email, setEmail] = useState("");

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await ForgotPasswordHandle(email)

            setErrMsg(data.message || "Reset Link send Successful");

            setTimeout(() => {
                setErrMsg("");
            }, 2000)

        } catch (error) {

            setTimeout(() => {
                setErrMsg("");
            }, 3000);
        }
    }

    return (
        <div className="form-container">
            <h1>{t("forgotPassword.right.title")} </h1>
            <p className='reset-subTitle'>{t("forgotPassword.right.description")}</p>

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
                    <label htmlFor="email">{t("auth.email")}</label>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} id='email' name='email' placeholder={t("auth.enterEmail")} required />
                </div>

                <button className='button primary-button'>{t("forgotPassword.right.button")}</button>


            </form>

            <div className="forgot-information">
              <span className='icon-forgot'><ShieldCheck /></span>
              <div className="info-sub">
                <h3>{t("forgotPassword.right.securityTitle")}</h3>
                <p>{t("forgotPassword.right.securityDesc")}</p>
              </div>
            </div>

        </div>
    )
}

export default ForgotRightPart
