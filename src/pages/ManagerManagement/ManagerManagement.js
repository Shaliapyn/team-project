import React from 'react'

import styles from '../../assets/scss/managermanagement.module.scss'
import Managers from '../../features/Managers/Managers'

const ManagerManagement = () => {
  return (
    <div className={`${styles.tableContainerManagers}`}>
      <div className="card shadow mb-4">
        <div className={`card-header py-3 ${styles.flexBlock}`}>
          <h2 className={`m-0 font-weight-bold text-primary  text ${styles.textResponsive}`}>Managers List</h2>
          <button type="button" className={`btn btn-primary w-auto ${styles.managementBtn}`}>
            Add Manager
          </button>
        </div>
        <div className="card-body px-5  overflow-auto">
          <table className={`table table-bordered shadow-sm`}>
            <thead className={`table-light ${styles.tableHead}`}>
              <tr>
                <th scope="col">Avatar</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Managment</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tableRow}>
                <th>Avatar</th>
                <td>Gustavus</td>
                <td>Adolphus</td>
                <td>@gmail</td>
                <td className={styles.btnBlock}>
                  <button type="button" className="btn btn-primary w-auto">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger w-auto">
                    Delete
                  </button>
                </td>
              </tr>
              <Managers />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManagerManagement
