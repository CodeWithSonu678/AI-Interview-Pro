import React from 'react'
import LeftPart from '../components/Login/LeftPart'
import { forgotPasswordCardData } from '../../interview/Data/ForgotPasswordData'
import ForgotRightPart from '../components/ForgotPassword/ForgotRightPart'
import Image from '../../../assets/forgot-icon.png'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth';

const ForgotPassword = () => {

    const { t } = useTranslation();

    const { user, loading, errMsg,ForgotPasswordHandle, setErrMsg } = useAuth();
    return (
        <>

            <main className='auth-main'>
                <div className="login-container">
                    <LeftPart
                        title1="forgotPassword.left.title1"
                        title2="forgotPassword.left.title2"
                        description1="forgotPassword.left.description"
                        cardData={forgotPasswordCardData}
                        back={true}
                        image={Image}
                    />

                    <ForgotRightPart t={t} errMsg={errMsg} setErrMsg={setErrMsg} ForgotPasswordHandle={ForgotPasswordHandle}/>
                </div>
            </main>
        </>
    )
}

export default ForgotPassword
