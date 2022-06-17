import React, { useState } from 'react'
import style from '../../assets/scss/AddMemberForm.module.scss'
import CloseButton from '../../ui/button/CloseButton'
import Input from '../../ui/input/Input/Input'
import { getAuth, updatePassword, signOut, reauthenticateWithCredential, reload } from 'firebase/auth'
import { auth } from '../../firebase-client'

const UpdatePassForm = ({ closeForm }) => {
  const [newPass, setNewPass] = useState('')

  //   const currentPass =
  //

  const user = auth.currentUser

  //   const reauthenticate = (currentPass) => {
  // 	const cred = EmailAuthProvider.credential(email, currentPass);
  // 	user.reauthenticateWithCredential
  //   }

  const updatePass = (e) => {
    e.preventDefault()
    updatePassword(user, newPass)
      .then(() => {
        alert('Password changed')
      })

      .catch((error) => {
        if (error.code == 'auth/requires-recent-login') {
          signOut(auth).then(function () {
            alert('Please sign in again to change your password.')
            setTimeout(function () {
              window.location.reload()
            }, 3000)
          })
        } else {
          alert(error.message)
        }
      })
  }

  return (
    <div className={style.background}>
      <div style={{ overflow: 'hidden' }}>
        <form className={style.plate} onSubmit={updatePass}>
          <CloseButton onClick={closeForm} />
          <div className={style.borders}>
            <h1 className={style.title}>Update password</h1>
            {/* <div className={style.element}>
              <Input
                id="currentPass"
                type={'text'}
                placeholder={'Current password'}
                //  value={currentPass}
                //
              />
            </div> */}
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
