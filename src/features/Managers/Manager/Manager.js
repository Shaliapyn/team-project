import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { membersCollection } from 'firebase-client'
import styles from 'assets/scss/membermanagement.module.scss'


const Manager = ({ member }) => {

  const defaultPhoto = 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'

  if (member.role !== 'admin') {

    const role = member.role === 'manager' ? 'user' : 'manager'

    const toogleRole = async (id) => {
      const updatedDoc = doc(membersCollection, id)
      const newField = { role: role }
      await updateDoc(updatedDoc, newField)
    }
    return (
      <tr key={member.id} style={{ verticalAlign: 'middle' }}>
        <td className="ps-0"> 
          <div className='d-flex align-items-center justify-content-center'>
            <img src={member.userPhoto || defaultPhoto} alt="avatar" className={styles.avatar} type={`image / png`}></img>
          </div>
        </td>
        <td>{member.firstName}</td>
        <td>{member.lastName}</td>
        <td>{member.email}</td>
        <td className="ps-0">
          <div className='d-flex align-items-center justify-content-center'>
            {member.role === 'manager' ? (
              <button onClick={() => toogleRole(member.id)} type="button" className="btn btn-outline-danger w-auto">
                Fire manager
              </button>
            ) : (
              <button onClick={() => toogleRole(member.id)} type="button" className="btn btn-outline-primary w-auto">
                Appoint manager
              </button>
            )}
          </div>
        </td>
      </tr>
    )
          }
}

export default Manager
