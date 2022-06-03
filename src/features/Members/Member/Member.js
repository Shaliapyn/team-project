import React from 'react'

import styles from '../../../assets/scss/membermanagement.module.scss'

const Member = ({ member }) => {
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
        <button type="button" className="btn btn-primary w-auto">
          Edit
        </button>
        <button type="button" className="btn btn-danger w-auto">
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
