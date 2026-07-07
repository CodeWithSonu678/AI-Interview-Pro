import React from 'react'
import { resetPasswordCardData } from '../../interview/Data/ResetPasswordData'
import LeftPart from '../components/Login/LeftPart'
import Image from '../../../assets/reset-icon.png'
import ResetRightPart from '../components/ResetPassword/ResetRightPart'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth';

const ResetPassword = () => {

    const { t } = useTranslation();

    const { user, loading,resetPasswordHandle, errMsg, setErrMsg } = useAuth();

    return (
        <>

            <main className='auth-main'>
                <div className="login-container">
                    <LeftPart
                        title1="resetPassword.left.title1"
                        title2="resetPassword.left.title2"
                        description1="resetPassword.left.description"
                        cardData={resetPasswordCardData}
                        back={true}
                        image={Image}
                    />

                    <ResetRightPart t={t} resetPasswordHandle={resetPasswordHandle}  errMsg={errMsg} setErrMsg={setErrMsg} />
                </div>
            </main>
        </>
    )
}

export default ResetPassword
