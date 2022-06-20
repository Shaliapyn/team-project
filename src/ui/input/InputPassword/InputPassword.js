import React from 'react'
import pass from 'assets/scss/email.module.scss'

const InputPassword = () => {
  return (
    <input type="password" className={`form-control ${pass.input}`} id="exampleInputPassword1" placeholder="Password" />
  )
}
export default InputPassword
