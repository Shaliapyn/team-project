import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../../../assets/scss/membermanagement.module.scss'
import MenuContext from '../../../context/MenuContext'
import { updateMember } from '../../../store/slices/memberUpSlice'

const Member = ({ member }) => {
  const { handleEdit } = useContext(MenuContext)
  const { setShowDeleteForm } = useContext(MenuContext)
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.member.member)

  const areYouSureDel = (id) => {
    setShowDeleteForm(true)
    if (member.id === id) {
      dispatch(updateMember(member))
    }
  }
  const updateMemb = (id) => {
    handleEdit()
    if (member.id === id) {
      dispatch(updateMember(member))
    }
  }
  console.log(currentUser.role === 'user')
  return currentUser.role === 'user' ? (
    <tr>
      <th scope="col">#</th>
      <td>{member.firstName}</td>
      <td>{member.lastName}</td>
      <td>{member.organisation}</td>
      <td>{member.phone}</td>
    </tr>
  ) : (
    <tr style={{ verticalAlign: 'middle' }}>
      <th scope="col">#</th>
      <td>{member.firstName}</td>
      <td>{member.lastName}</td>
      <td>{member.organisation}</td>
      <td>{member.email}</td>
      <td>{member.phone}</td>
      <td>{member.initialScore}</td>
      <td>{member.birthDate}</td>
      <td className={styles.btnBlock}>
        <button onClick={() => updateMemb(member.id)} type="button" className="btn btn-primary w-auto">
          Edit
        </button>
        <button onClick={() => areYouSureDel(member.id)} type="button" className="btn btn-danger w-auto">
          Delete
        </button>
      </td>
    </tr>
  )
}

export default Member
