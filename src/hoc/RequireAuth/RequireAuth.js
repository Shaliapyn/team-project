import React from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from 'firebase-client'

const RequireAuth = ({ children }) => {
  const user = auth.currentUser

  if (!!user) {
    <Navigate to="auth/" />
  } else {
    <Navigate to="/" />
  }

  return children
}

export default RequireAuth
