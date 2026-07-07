import React, { useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router';
import toast from "react-hot-toast";
import { ShieldCheck, LockKeyhole, Circle, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import '../../styles/ResetPassword/ResetRightPart.scss'

const ResetRightPart = ({ t, resetPasswordHandle, errMsg, setErrMsg }) => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassNew, setShowPassNew] = useState(false)
    const [showPassCon, setShowPassCon] = useState(false)

    const { resetToken } = useParams();

    //strong password
    const hasMinLength = newPassword.length >= 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumberOrSymbol = /[\d!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    const isValidPassword = hasMinLength && hasUpperCase && hasLowerCase && hasNumberOrSymbol;


    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (!isValidPassword) {
                setErrMsg("Please follow all password requirements.");
                return;
            }

            if (newPassword !== confirmPassword) {
                setErrMsg("Passwords do not match.");
                return;
            }

            const data = await resetPasswordHandle(resetToken, newPassword)

            setErrMsg(data.message || "Password reset Successful");
            toast.success("Password reset is successful")

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
        <div className="form-container">
            <h1>{t("resetPassword.right.title")} </h1>
            <p className='reset-subTitle'>{t("resetPassword.right.description")}</p>

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
                    <label htmlFor="newPassword">{t("resetPassword.right.newPassword")}</label>

                    <div className="password-field">

                        <input type={showPassNew ? "text" : "password"} autoComplete="new-password" onChange={(e) => { setNewPassword(e.target.value) }} name='newPassword' placeholder={t("resetPassword.right.newPasswordPlaceholder")} required />
                        {
                            showPassNew === true ? <Eye strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPassNew(!showPassNew) }} /> : <EyeOff strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPassNew(!showPassNew) }} />
                        }

                    </div>
                </div>


                <div className="input-group">
                    <label htmlFor="confirmPassword">{t("resetPassword.right.confirmPassword")}</label>

                    <div className="password-field">

                        <input type={showPassCon ? "text" : "password"} onChange={(e) => { setConfirmPassword(e.target.value) }} name='confirmPassword' placeholder={t("resetPassword.right.confirmPasswordPlaceholder")} required />
                        {
                            showPassCon === true ? <Eye strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPassCon(!showPassCon) }} /> : <EyeOff strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPassCon(!showPassCon) }} />
                        }
                    </div>
                </div>

                {/* instruction for strong password */}

                <div className="instructionForPassword">
                    <h3>{t("resetPassword.right.requirementsTitle")}</h3>

                    <div className="instruction-section">

                        <div className="instruction">
                            {
                                hasMinLength ? (
                                    <CheckCircle2 size={18} color="#ff2d75" />
                                ) : (
                                    <Circle size={18} color="#8b93a7" />
                                )
                            }
                            <p>{t("resetPassword.right.requirements.length")}</p>
                        </div>

                        <div className="instruction">
                            {
                                hasUpperCase ? (
                                    <CheckCircle2 size={18} color="#ff2d75" />
                                ) : (
                                    <Circle size={18} color="#8b93a7" />
                                )
                            }
                            <p>{t("resetPassword.right.requirements.uppercase")}</p>
                        </div>

                        <div className="instruction">
                            {
                                hasLowerCase ? (
                                    <CheckCircle2 size={18} color="#ff2d75" />
                                ) : (
                                    <Circle size={18} color="#8b93a7" />
                                )
                            }
                            <p>{t("resetPassword.right.requirements.lowercase")}</p>
                        </div>

                        <div className="instruction">
                            {
                                hasNumberOrSymbol ? (
                                    <CheckCircle2 size={18} color="#ff2d75" />
                                ) : (
                                    <Circle size={18} color="#8b93a7" />
                                )
                            }
                            <p>{t("resetPassword.right.requirements.number")}</p>
                        </div>

                    </div>
                </div>

                <button className='button primary-button'><LockKeyhole strokeWidth={1.25} />{t("resetPassword.right.button")}</button>


            </form>

            <div className="footer-reset">
                <span className='icon-forgot'><ShieldCheck /></span>
                <p>{t("resetPassword.right.footer")}</p>
            </div>

        </div>
    )
}

export default ResetRightPart
