import React from 'react'
import style from 'assets/scss/input.module.scss'

const Input = ({ type, placeholder, value, onChange, min, max }) => {
  return (
    <input
      className={`form-control ${style.input}`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required
      min={min}
      max={max}
    />
  )
}

export default Input
