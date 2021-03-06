import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'firebase-client'

import Input from 'ui/input/Input'

import style from 'assets/scss/login.module.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  let navigate = useNavigate()

  async function signIn(e) {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('../auth/home')
      })
      .catch(() => {
        setError('Wrong email or password')
        console.error(error)
      })
  }

  const forgotPassword = (e) => {
    e.preventDefault()
    navigate('../forgot-password')
  }

  return (
    <div className={style.container}>
      <div className={style.plate}>
        <div className={style.img}> </div>
        <form onSubmit={signIn} className={style.form}>
          <div className={style.border}>
            <h2 className={style.title}>Welcome!</h2>
            {error && <div className={`alert alert-danger`}>{error}</div>}
            <div className={style.element}>
              <Input type={'email'} placeholder={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={style.element}>
              <Input
                type={'password'}
                placeholder={'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <button type="submit" style={{ fontSize: '18px' }} className={`btn btn-primary rounded-pill w-75`}>
                &nbsp;&nbsp;&nbsp; Sign In &nbsp;&nbsp;&nbsp;
              </button>
            </div>
            <div className={style.element}>
              <button
                type="button"
                style={{ fontSize: '16px' }}
                className="btn btn-outline-secondary rounded-pill mt-5 w-100"
                onClick={forgotPassword}
              >
                Forgot your password?
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
