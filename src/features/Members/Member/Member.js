import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from 'assets/scss/membermanagement.module.scss'
import MenuContext from 'context/MenuContext'
import { EditSvg, DeleteSvg } from 'assets/svg/svg-icons'
import { updateMember } from 'store/slices/memberUpSlice'

import { auth } from 'firebase-client'

const Member = ({ member }) => {
  const { handleEdit } = useContext(MenuContext)
  const { setShowDeleteForm } = useContext(MenuContext)
  const dispatch = useDispatch()
  const [photo, setPhoto] = useState(
    'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
  )

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

  return currentUser.role === 'user' ? (
    <tr>
      <th scope="col">
        <div
          // src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
          // alt="avatar"
          className={styles.avatar}
        >
          {'1 '}
        </div>
      </th>
      <td>{member.firstName}</td>
      <td>{member.lastName}</td>
      <td>{member.organisation}</td>
      <td>{member.phone}</td>
    </tr>
  ) : (
    <tr style={{ verticalAlign: 'middle' }}>
      <th scope="col">
        {' '}
        <img src={member.userPhoto} alt="avatar" className={styles.avatar} type={`image / png`}></img>
      </th>
      <td>{member.firstName}</td>
      <td>{member.lastName}</td>
      <td>{member.organisation}</td>
      <td>{member.email}</td>
      <td>{member.phone}</td>
      <td>{member.score}</td>
      <td>{member.birthDate}</td>
      <td className={styles.btnBlock}>
        <div onClick={() => updateMemb(member.id)}>
          <EditSvg />
        </div>
        <div onClick={() => areYouSureDel(member.id)}>
          <DeleteSvg />
        </div>
      </td>
    </tr>
  )
}

export default Member
