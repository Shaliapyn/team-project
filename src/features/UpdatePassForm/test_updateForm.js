import React, { useState } from 'react'
import style from '../../assets/scss/AddMemberForm.module.scss'
import CloseButton from '../../ui/button/CloseButton'
import Input from '../../ui/input/Input/Input'

import { updatePassword, signOut, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { auth } from '../../firebase-client'

const UpdatePassForm = ({ closeForm }) => {
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')

  const user = auth.currentUser

  const reauthenticate = (currentPass) => {
    console.log('mail', user.email)
    const cred = EmailAuthProvider.credential(user.email, currentPass)
    return reauthenticateWithCredential(user, cred)
  }

  const updatePass = (e) => {
    reauthenticate(currentPass)
      .then(() => {
        e.preventDefault()
        updatePassword(user, newPass)
          .then(() => {
            alert('Password was changed')
          })
          .catch((error) => {
            if (error.code == 'auth/requires-recent-login') {
              signOut(auth).then(function () {
                alert('Please sign in again to change your password.')
                setTimeout(function () {
                  window.location.reload()
                }, 2000)
              })
            } else {
              alert(error.message)
            }
          })
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return (
    <div className={style.background}>
      <div style={{ overflow: 'hidden' }}>
        <form className={style.plate} onSubmit={updatePass}>
          <CloseButton onClick={closeForm} />
          <div className={style.borders}>
            <h1 className={style.title}>Update password</h1>
            <div className={style.element}>
              <Input
                id="currentPass"
                type={'text'}
                placeholder={'Current password'}
                value={currentPass}
                onChange={(text) => setCurrentPass(text)}
              />
            </div>
            <div className={style.element}>
              <Input
                id="newPass"
                type={'password'}
                placeholder={'New password'}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <button type="submit" style={{ fontSize: '16px' }} className="btn btn-primary rounded-pill w-100">
                Submit changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassForm
