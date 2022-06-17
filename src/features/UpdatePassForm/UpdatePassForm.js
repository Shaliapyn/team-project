import React, { useState } from 'react'
import style from '../../assets/scss/AddMemberForm.module.scss'
import CloseButton from '../../ui/button/CloseButton'
import Input from '../../ui/input/Input/Input'

const UpdatePassForm = ({ closeForm }) => {
  const [newPass, setNewPass] = useState('')
 
  //   const currentPass =
  //
  const updatePass = (e) => {
    e.preventDefault()
  }

  return (
    <div className={style.background}>
      <div style={{ overflow: 'hidden' }}>
        <form className={style.plate}>
          <CloseButton onClick={closeForm} />
          <div className={style.borders}>
            <h1 className={style.title}>Update password</h1>
            <div className={style.element}>
              <Input
                id="currentPass"
                type={'text'}
                placeholder={'Current password'}
                //  value={currentPass}
                //
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
