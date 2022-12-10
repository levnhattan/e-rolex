import React from 'react'
import Auth from '../Auth'
import {Navigate, Outlet} from 'react-router-dom'


const ProtectedRouter = () => {
    const { currentUser} = Auth()

  return currentUser ? <Outlet/> : <Navigate to='/login' />;
}

export default ProtectedRouter