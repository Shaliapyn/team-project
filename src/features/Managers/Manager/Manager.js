import React from 'react'
import styles from '../../../assets/scss/managermanagement.module.scss'

const Manager = ({ manager }) => {
  return (
    <tr style={{ verticalAlign: 'middle' }}>
      <th scope="col">Avatar</th>
      <td>{manager.firstName}</td>
      <td>{manager.lastName}</td>
      <td>{manager.email}</td>
      <td className={styles.btnBlock}>
        <button type="button" className="btn btn-primary w-auto">
          Edit
        </button>
        <button  type="button" className="btn btn-danger w-auto">
          Delete
        </button>
      </td>
    </tr>
  )
}

export default Manager
