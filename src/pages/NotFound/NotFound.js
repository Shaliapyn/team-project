import React from 'react'
import { Link } from 'react-router-dom'

import styles from 'assets/scss/start.module.scss'

function NotFound() {
  return (
    <div className={styles.container}>
      <p> Page Not Found. </p>
      <p> Please, welcome to our </p>
      <p>
        <Link to="/"> Start Page </Link>
      </p>
    </div>
  )
}

export default NotFound
