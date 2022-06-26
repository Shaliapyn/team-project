import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from 'assets/scss/start.module.scss'

function NotFound() {
  const user = useSelector((state) => state.member.member)
  return (
    <>
      {!user.email &&
        <div className={styles.container}>
          <p> Page Not Found. </p>
          <p> Please, welcome to our </p>
          <p>
            <Link to="/" className='text-danger'> Start Page </Link>
          </p>
        </div>
      }
      {!!user.email &&
        <div className={styles.container}>
          <p> Page Not Found. </p>
          <p> Please, welcome to your </p>
          <p className='text-reset'>
            <Link to="/" className='text-danger'> Home Page </Link>
          </p>
        </div>
      }
    </>
    
  )
}

export default NotFound
