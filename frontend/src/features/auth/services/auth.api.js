import axios from 'axios';

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    // baseURL:"http://localhost:3000",
    withCredentials:true
});

export const register = async(username,email,password)=>{
    try {
        const res = await api.post("/api/auth/register",{username,email,password});

        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const login = async(email,password)=>{
    try {
        const res = await api.post("/api/auth/login",{email,password});

        return res.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const forgotPassword = async(email)=>{
    try {
        const res = await api.post("/api/auth/forgot-password",{email});

        return res.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const resetPassword = async(resetToken,newPassword)=>{
    try {
        
        const res = await api.post(`/api/auth/reset-password/${resetToken}`,{newPassword});
        
        return res.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const logout = async()=>{
    try {
        const res = await api.get("/api/auth/logout");

        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const getMe = async()=>{
    try {
        const res = await api.get("/api/auth/get-me");

        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const googleLogin = async(token)=>{
    try {
        const res = await api.post("/api/auth/google",{token})

        return res.data;
    } catch (error) {
        console.log(error)
    }
}
