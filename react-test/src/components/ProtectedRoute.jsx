import React from 'react'
import { Navigate, Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectedRoute = ({ children, ...rest}) => {
    let token
    let user;
    const getToken = () => {
      token = localStorage.getItem('token')
    }
    const getUser = () => {
      user = JSON.parse(localStorage.getItem('user'))
    }
    getUser()
    getToken()
  
    return user && token ? children : <LoadingToRedirect />;
}

export default ProtectedRoute