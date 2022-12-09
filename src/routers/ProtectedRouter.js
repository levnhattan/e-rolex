import React from 'react'
import Auth from '../Auth'
import {Navigate} from 'react-router-dom'


const ProtectedRouter = ({children}) => {
    const { currentUser} = Auth()

  return currentUser ? children : <Navigate to='/login' />;
}

export default ProtectedRouter