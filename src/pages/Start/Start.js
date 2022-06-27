import React from 'react'

import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from 'assets/scss/start.module.scss'

function Start() {
  const currentMember = useSelector((state) => state.member.member)
  return (
    <div className={styles.container}>
      {!currentMember.email &&
        <>
          <p className={styles.logbook}>LogBook</p>
          <p> It's a private web portal to mark event visits. </p>
          <p>Please, Sign In!</p>
        </>}
      {!!currentMember.email && <Navigate to="auth/home" /> }
    </div>
  )
}

export default Start
