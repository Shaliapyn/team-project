import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.member.member)

  if (!!user) {
    <Navigate to="auth/" />
    return children
  } else {
    <Navigate to="/" />
  }
}

export default RequireAuth
