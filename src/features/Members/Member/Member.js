import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, deleteDoc, doc } from 'firebase/firestore'

import styles from '../../../assets/scss/membermanagement.module.scss'
import MenuContext from '../../../context/MenuContext'
import { membersCollection, eventsCollection } from '../../../firebase-client'
import { memberUpState, updateMember } from '../../../store/slices/memberUpSlice'
import { eventsState } from '../../../store/slices/eventsSlice';

const Member = ({ member }) => {
  const { handleEdit } = useContext(MenuContext)
  const dispatch = useDispatch()
  const events = useSelector(eventsState);

  const handleRemove = async (id) => {
    const todoDoc = doc(membersCollection, id);
    await deleteDoc(todoDoc);
    
    {events && events.map(async (event) => {
      const docRef = doc(eventsCollection, event.id);
      const colRef = collection(docRef, 'participants');
      await deleteDoc(doc(colRef, id));
    })} 
  }

  const updatedMember = useSelector(memberUpState)

  const updateMemb = (id) => {
    handleEdit()
    if (member.id === id) {
      dispatch(updateMember(member))
    }
    
  }
  return (
    // Manager || Admin ?

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
        <button onClick={() => handleRemove(member.id)} type="button" className="btn btn-danger w-auto">
          Delete
        </button>
      </td>
    </tr>

  )
}

export default Member
