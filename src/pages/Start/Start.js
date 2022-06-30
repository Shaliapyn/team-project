import React from 'react'

import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Start() {
  const currentMember = useSelector((state) => state.member.member)
  return (
    <div className='w-100 text-center fs-3' style={{marginTop: '160px'}}>
      {!currentMember.email && (
        <>
          <p className='text-primary mb-4 fw-bold' style={{fontSize: '480%'}}>LogBook</p>
          <p> It's a private web portal to mark event visits. </p>
          <p>Please, Sign In!</p>
        </>
      )}
      {!!currentMember.email && <Navigate to="auth/home" />}
    </div>
  )
}

export default Start
