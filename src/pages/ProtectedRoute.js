import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from './AuthRoute'

const ProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    const location = useLocation();

  return user === 'true' ?  children : 
      <Navigate to='/login' replace state={{ path : location.pathname }} /> 
}

export default ProtectedRoute
