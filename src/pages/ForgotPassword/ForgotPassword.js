import React from 'react'

import InputEmail from '../../ui/input/InputEmail'
import LoginButton from '../../ui/button/LoginButton'
import style from '../../assets/scss/forgotPassword.module.scss'

const ForgotPassword = () => {
  return (
    <div className={style.container}>
      <div className={style.plate}>
        <div className={style.img}> </div>
        <div className={style.form}>
          <div class={style.border}>
            <h2 className={style.title}>Forgot Your Password?</h2>
            <p className={style.parag}>
              We get it, stuff happens. Just enter your email address below and we'll send you a link <br></br>to reset
              your password!
            </p>
            <div className={style.element}>
              <InputEmail />
            </div>

            <div className={style.element}>
              <LoginButton buttonText="Reset Password" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
