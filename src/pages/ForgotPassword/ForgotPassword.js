import React, { useState } from 'react'

import { sendPasswordResetEmail } from 'firebase/auth'

import InputEmail from 'ui/input/InputEmail'
import LoginButton from 'ui/button/LoginButton'
import style from 'assets/scss/forgotPassword.module.scss'
import { auth } from 'firebase-client'

const ForgotPassword = () => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email)
    if (email)
      try {
        setMessage('')
        setError('')
        await resetPassword(email)
        setMessage('Check your inbox for further instructions')
      } catch {
        setError('Failed to reset password')
      }
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.plate}>
        <div className={style.img}> </div>
        <div className={style.form}>
          <div clclassNameass={style.border}>
            <h2 className={style.title}>Forgot Your Password?</h2>
            <p className={style.parag}>
              We get it, stuff happens. Just enter your email address below and we'll send you a link <br></br>to reset
              your password!
            </p>
            {error && <div className={`alert alert-danger`}>{error}</div>}
            {message && <div className={`alert alert-primary`}>{message}</div>}
            <div className={style.element}>
              <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className={style.element}>
              <LoginButton buttonText="Reset Password" type="submit" />
              {/* <button type='submit'>reset</button> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
