import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getMe, googleLogin } from '../services/auth.api.js';
import { useNavigate } from 'react-router'
import toast from "react-hot-toast";

export const useAuth = () => {

    const content = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = content;
    const Navigate = useNavigate();


    const registerHandle = async (username, email, password) => {
        setLoading(true)
        try {
            const data = await register(username, email, password)

            setUser(data)
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }

    const loginHandle = async (email, password) => {
        setLoading(true)
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
        try {
            const data = await logout()

            setUser(data)
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }

    const googleLoginHandle = async (token) => {
        setLoading(true)
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
        }
    }



    //jb component render hota hai toh yee ek bar chlega kyunki empty array diye hain. 
    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await getMe();
                setUser(data.user)
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }

        fetchData();

    }, []);

    return {
        user,
        loading,
        registerHandle,
        loginHandle,
        logoutHandle,
        googleLoginHandle
    };
}