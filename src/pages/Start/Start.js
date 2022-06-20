import React from 'react'

import styles from 'assets/scss/start.module.scss'

function Start() {
  return (
    <div className={styles.container}>
      <p className={styles.logbook}>LogBook</p>
      <p> It's a private web portal to mark event visits. </p>
      <p>Please, Sign In!</p>
    </div>
  )
}

export default Start
