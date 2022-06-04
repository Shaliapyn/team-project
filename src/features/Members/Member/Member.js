import { deleteDoc, doc } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../../../assets/scss/membermanagement.module.scss'
import MenuContext from '../../../context/MenuContext'
import { membersCollection } from '../../../firebase-client'
import { memberUpState, updateMember } from '../../../store/slices/memberUpSlice'

const Member = ({ member }) => {
  const { handleEdit } = useContext(MenuContext)
  const dispatch = useDispatch()
  const handleRemove = async (id) => {
    const todoDoc = doc(membersCollection, id)
    await deleteDoc(todoDoc)
  }
  const updatedMember = useSelector(memberUpState)

  const updateMemb = (id) => {
    handleEdit()
    if (member.id === id) {
      dispatch(updateMember(member))
    }
    console.log(updatedMember)
  }
  return (
    // {Manager || Admin ?
    //     (
    <tr style={{ verticalAlign: 'middle' }}>
      <th scope="col">#</th>
      <td>{member.firstName}</td>
      <td>{member.lastName}</td>
      <td>{member.orgaisation}</td>
      <td>{member.email}</td>
      <td>{member.phone}</td>
      <td>{member.score}</td>
      <td>{member.birthDate}</td>
      <td className={styles.btnBlock}>
        <button onClick={() => updateMemb(member.id)} type="button" className="btn btn-primary w-auto">
          Edit
        </button>
        <button onClick={() => handleRemove(member.id)} type="button" className="btn btn-danger w-auto">
          Delete
        </button>
      </td>
    </tr>
    //                 )  :
    //                 (
    //                   <tr>
    //                     <th scope="row">1</th>
    //                     <td>{member.firstName}</td>
    //                     <td>{member.lastName}</td>
    //                     <td>{member.orgaisation}</td>
    //                     <td>{member.phone}</td>
    //                 </tr>)
    // }
  )
}

export default Member
