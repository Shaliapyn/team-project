import React, { useContext, useEffect, useRef, useState } from 'react'

import { auth } from 'firebase-client'
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'

import CloseButton from 'ui/button/CloseButton'
import Input from 'ui/input/Input/Input'

import styles from 'assets/scss/changePasswordForm.module.scss'
import MenuContext from 'context/MenuContext'

const ChangePassword = ({ closeForm }) => {
  const user = auth.currentUser
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newPassConfirmed, setNewPassConfirmed] = useState('')
  const [showError1, setShowError1] = useState(false)
  const [showError2, setShowError2] = useState(false)
  const [message, setMessage] = useState(false)

  const handlerChangePassword = (e) => {
    e.preventDefault()
    const credential = EmailAuthProvider.credential(user.email, currentPass)

    reauthenticateWithCredential(user, credential)
      .then(() => {
        if (newPass === newPassConfirmed && newPass.trim().length >= 6) {
          updatePassword(user, newPass)
            .then(() => {
              setMessage(true)
            })
            .catch((error) => {
              console.error(error)
            })
        } else {
          setShowError2(true)
          setNewPass('')
          setNewPassConfirmed('')
        }
      })
      .catch((error) => {
        console.error(error)
        setShowError1(true)
        setCurrentPass('')
      })
  }

  const { showChangePass, setShowChangePass } = useContext(MenuContext)
  const ref = useRef()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the modal
      if (showChangePass && ref.current && !ref.current.contains(e.target)) {
        setShowChangePass(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showChangePass])

  return (
    <>
      {!message && (
        <div className={styles.background}>
          <form onSubmit={handlerChangePassword} name="changePassword" className={styles.plate} ref={ref}>
            <CloseButton onClick={closeForm} />
            <div className={styles.borders}>
              <h1 className={`${styles.title} text-light`}>Change Password</h1>
              <div className={styles.element}>
                <Input
                  type={'password'}
                  placeholder={'Enter your current password'}
                  value={currentPass}
                  onChange={(e) => {
                    setCurrentPass(e.target.value)
                    setShowError1(false)
                  }}
                />
              </div>
              <div className={styles.element}>
                <Input
                  type={'password'}
                  placeholder={'Enter your new password'}
                  value={newPass}
                  onChange={(e) => {
                    setNewPass(e.target.value)
                    setShowError2(false)
                  }}
                />
              </div>
              <div className={styles.element}>
                <Input
                  type={'password'}
                  placeholder={'Confirm your new password'}
                  value={newPassConfirmed}
                  onChange={(e) => {
                    setNewPassConfirmed(e.target.value)
                    setShowError2(false)
                  }}
                />
              </div>
              <div className={styles.element}>
                <button
                  type="submit"
                  style={{ fontSize: '18px', height: '50px' }}
                  className={`btn btn-primary rounded-pill ${styles.button}`}
                >
                  Change password
                </button>
              </div>
              {showError1 && (
                <div className={styles.element}>
                  <p className="fs-5 text-danger">Enter correct current password</p>
                </div>
              )}
              {showError2 && (
                <div className={styles.element}>
                  <p className="fs-5 text-danger lh-base">
                    Enter correct new password (six or more characters) and confirm it
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
      {message && (
        <div className={styles.background}>
          <form className={styles.smallPlate}>
            <div className={styles.borders}>
              <p className="mt-4 fs-4 lh-base text-primary">Password has been changed successfully!</p>
              <p className="fs-5 lh-base text-dark">Now you can sign in with your new password</p>
              <button type="button" className={`btn btn-outline-primary rounded-pill ${styles.buttonOk}`} onClick={closeForm}>
                OK
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default ChangePassword
