import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router';
import { GoogleLogin } from '@react-oauth/google'
import toast from "react-hot-toast";
import { Eye, EyeOff } from 'lucide-react'

const RightPart = ({ t, loginHandle, googleLoginHandle, errMsg, setErrMsg }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false)

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginHandle(email, password)

            setErrMsg(data.msg || "Login Successful");

            setTimeout(() => {
                setErrMsg("");
                Navigate('/')
            }, 2000)

        } catch (error) {

            setTimeout(() => {
                setErrMsg("");
            }, 3000);
        }
    }

    return (
        <div className="form-container">
            <h1>{t("auth.loginTitle")} </h1>

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
                <div className="input-group">
                    <label htmlFor="password">{t("auth.password")}</label>

                    <div className="password-field">

                        <input type={showPass ? "text" : "password"} onChange={(e) => { setPassword(e.target.value) }} id='password' name='password' placeholder={t("auth.enterPassword")} required />

                        {
                            showPass === true ? <Eye strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPass(!showPass) }} /> : <EyeOff strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPass(!showPass) }} />
                        }

                    </div>
                </div>

                <div className="input-group forgot-password">
                    <Link to={'/forgot-password'}  >Forgot Password </Link>
                </div>

                <button className='button primary-button'>{t("auth.loginBtn")}</button>

                <GoogleLogin
                    onSuccess={async (response) => {
                        try {
                            await googleLoginHandle(response.credential);
                        } catch (error) {
                            setErrMsg(error?.response?.data?.msg || "Google login failed");
                            toast.error(
                                error?.response?.data?.msg ||
                                "Google login failed"
                            );
                        }
                    }}
                    onError={() => {
                        console.error("Google Login Failed");
                        toast.error("Google Sign-In failed. Please try again.");
                    }}
                />

            </form>
            <p>{t("auth.dontHaveAccount")} <Link to='/register'>{t("auth.registerLink")}</Link></p>
        </div>
    )
}

export default RightPart
