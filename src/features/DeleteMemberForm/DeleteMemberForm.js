import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { useSelector } from 'react-redux'

import style from '../../assets/scss/AddMemberForm.module.scss'
import { membersCollection } from '../../firebase-client'
import { memberUpState } from '../../store/slices/memberUpSlice'
import CloseButton from '../../ui/button/CloseButton'

const DeleteMemberForm = ({ closeForm }) => {
    const member = useSelector(memberUpState)
    let memberId = member.id
    const handleRemove = async (e) => {
        e.preventDefault()
        const todoDoc = doc(membersCollection, memberId)
        await deleteDoc(todoDoc)
        closeForm()
      }
  return (
    <div>
         <div className={style.background}>
      <div style={{ overflow: 'hidden' }}>
        <form onSubmit={handleRemove} className={style.plate}  name="createUser">
          <CloseButton onClick={closeForm} />
          <div className={style.borders}>
            <h1 className={style.title}>Are you sure, you want to delete this member?</h1>
            <ul className={`d-flex w-100 justify-content-between`}>
                <li>{member.firstName}</li>
                <li>{member.lastName}</li>
                <li>{member.email}</li>
            </ul>
            <div className={style.element}>
              <button type="submit" style={{ fontSize: '16px' }} className="btn btn-primary rounded-pill w-100">
                I'm sure
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default DeleteMemberForm