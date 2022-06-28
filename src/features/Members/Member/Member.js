import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MenuContext from 'context/MenuContext'
import { updateMember } from 'store/slices/memberUpSlice'

import { EditSvg, DeleteSvg } from 'assets/svg/svg-icons'
import styles from 'assets/scss/membermanagement.module.scss'

const Member = ({ member }) => {
  const { handleEdit } = useContext(MenuContext)
  const { setShowDeleteForm } = useContext(MenuContext)
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.member.member)
  const defaultPhoto =
    'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'

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
      <td scope="col" className="ps-0">
        <div className='d-flex align-items-center justify-content-center'>
          <img src={member.userPhoto || defaultPhoto} alt="avatar" className={styles.avatar} type={`image / png`}></img>
        </div> 
      </td>
      <td>{member.firstName}</td>
      <td>{member.lastName}</td>
      <td>{member.phone}</td>
      <td>{member.organisation}</td>
    </tr>
  ) : (
    <tr style={{ verticalAlign: 'middle' }}>
      <td scope="col" className="ps-0">
        <div className='d-flex align-items-center justify-content-center'>
          <img src={member.userPhoto || defaultPhoto} alt="avatar" className={styles.avatar} type={`image / png`}></img>
        </div> 
      </td>
      <td>{member.firstName}</td>
      <td>{member.lastName}</td>
      <td>{member.organisation}</td>
      <td>{member.email}</td>
      <td>{member.phone}</td>
      <td>{member.score}</td>
      <td>{member.birthDate}</td>
      <td className="ps-0">
        <div className='d-flex align-items-center justify-content-center'>
          <div className={styles.btnBlock}>
            <div onClick={() => updateMemb(member.id)}>
              <EditSvg />
            </div>
            {member.role !== 'admin' && (
              <div onClick={() => areYouSureDel(member.id)}>
                <DeleteSvg />
              </div>
            )}
            {member.role === 'admin' && (
              <div className='invisible'>
                <DeleteSvg />
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Member
