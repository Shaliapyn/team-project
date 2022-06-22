import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import styles from 'assets/scss/forgotPassword.module.scss'
import { auth } from 'firebase-client'
import Button from 'ui/button/Button'
import InputEmail from 'ui/input/InputEmail'

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
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.plate}>
        <div className={styles.img}> </div>
        <div className={styles.form}>
          <div className={styles.border}>
            <h2 className={styles.title}>Forgot Your Password?</h2>
            <p className={styles.parag}>
              We get it, stuff happens. Just enter your email address below and we'll send you a link <br></br>to reset
              your password!
            </p>
            {error && <div className={`alert alert-danger`}>{error}</div>}
            {message && <div className={`alert alert-primary`}>{message}</div>}
            <div className={styles.element}>
              <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className={styles.element}>
              <Button type="submit" className={`btn-primary ${styles.loginButton}`}>
                Reset Password
              </Button>
              {/* <button type='submit'>reset</button> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
