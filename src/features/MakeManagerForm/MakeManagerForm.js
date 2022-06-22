import React from 'react'
import { useSelector } from 'react-redux'

import style from 'assets/scss/AddMemberForm.module.scss'
import { membersCollection } from 'firebase-client'
import { doc, updateDoc } from 'firebase/firestore'
import { membersState } from 'store/slices/membersSlice'
import CloseButton from 'ui/button/CloseButton'

const MakeManagerForm = ({ closeForm }) => {
  const members = useSelector(membersState)

  const memberList = members.map((member, id) => {
    if (member.role !== 'admin') {
      const isChecked = member.role === 'manager' ? true : false
      const toogleRole = member.role === 'manager' ? 'user' : 'manager'

      const toogleChecked = async (id) => {
        const updatedDoc = doc(membersCollection, id)
        const newField = { role: toogleRole }
        await updateDoc(updatedDoc, newField)
      }
      return (
        <tr>
          <td>{member.firstName}</td>
          <td>{member.lastName}</td>
          <td>{member.email}</td>
          <td>
            <input
              type="checkbox"
              checked={isChecked}
              onClick={() => toogleChecked(member.id)}
              aria-label="Checkbox for following text input"
            />
          </td>
        </tr>
      )
    }
  })
  return (
    <div className={style.background}>
      <div style={{ overflow: 'hidden' }}>
        <form className={`w-75 ${style.plate}`} name="createUser">
          <CloseButton onClick={closeForm} />
          <div className={style.borders}>
            <h1 className={style.title}>Choose managers</h1>
            <table className="table table-bordered table-responsive-lg table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="py-3 pe-5 ps-4">
                    First Name
                  </th>
                  <th scope="col" className="py-3  ps-4">
                    {' '}
                    Last Name{' '}
                  </th>
                  <th scope="col" className="py-3  ps-4">
                    {' '}
                    Email{' '}
                  </th>
                  <th scope="col" className="py-3  ps-4">
                    {' '}
                    Select managers{' '}
                  </th>
                </tr>
              </thead>
              <tbody>{memberList}</tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MakeManagerForm
