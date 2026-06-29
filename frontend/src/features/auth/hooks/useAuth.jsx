import { useContext, useEffect,useState } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getMe, googleLogin } from '../services/auth.api.js';
import { useNavigate } from 'react-router'
import toast from "react-hot-toast";
import { InterviewContent } from "../../interview/interview.content.jsx";

export const useAuth = () => {

    const content = useContext(AuthContext);
    const { user, setUser,authLoading } = content;
    const { loading, setLoading,loadingMessage, setLoadingMessage } = useContext(InterviewContent);
    const Navigate = useNavigate();

    const [errMsg, setErrMsg] = useState("");


    const registerHandle = async (username, email, password) => {
        setLoading(true)
        setLoadingMessage("Creating your account...");
        try {
            const data = await register(username, email, password)

            setUser(data)
            return data;
        } catch (error) {
            setErrMsg(error)
            toast.error(
                error?.response?.data?.msg ||
                "Failed Registration"
            );

            throw error;
        } finally {
            setLoading(false)
        }
    }

    const loginHandle = async (email, password) => {
        setLoading(true)
        setLoadingMessage("Loading home page...")
        try {
            const data = await login(email, password)

            //agar login fail hua toh catch code chlao
            if (!data.success) {
                throw data.msg;
            }

            //success
            setUser(data)
            return data;
        } catch (error) {
            setErrMsg(error)
            toast.error(
                error?.response?.data?.msg ||
                "Failed Login"
            );
            throw error?.res?.data?.msg || error || "Login Failed !";
        } finally {
            setLoading(false)
        }
    }

    const logoutHandle = async () => {
        setLoading(true)
        setLoadingMessage("Signing you out...");
        try {
            const data = await logout()

            setUser(null)
            Navigate('/login')
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }

    const googleLoginHandle = async (token) => {
        setLoading(true)
        setLoadingMessage("Signing you in with Google...");
        try {
            const data = await googleLogin(token)

            if (data.success === true) {
                Navigate('/')
            }
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
            setLoadingMessage("Please wait...");
        }
    }

    return {
        user,
        loading,
        authLoading,
        registerHandle,
        loginHandle,
        logoutHandle,
        googleLoginHandle,
        setLoadingMessage,
        loadingMessage,
        errMsg,
        setErrMsg
    };
}