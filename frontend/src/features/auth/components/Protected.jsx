import { useAuth } from "../hooks/useAuth";
import {Navigate} from 'react-router';
import React from "react";
import Loader from "./Loader/Loader";

const Protected = ({children})=>{

    const {authLoading,user} = useAuth();

    if (authLoading) {
        return null;
    }

    if(!user){
        return <Navigate to={'/login'} replace />

    }

    return children;
}

export default Protected;