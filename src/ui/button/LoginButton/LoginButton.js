import React from 'react'
import styles from 'assets/scss/loginbutton.module.scss'

const LoginButton = ({ buttonText, props }) => {
  return (
    <div>
      <button {...props} className={`btn rounded-pill btn-primary ${styles.loginButton}`}>
        {buttonText}
      </button>
    </div>
  )
}
export default LoginButton
