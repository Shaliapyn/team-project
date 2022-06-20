import React from 'react'

import styles from 'assets/scss/managermanagement.module.scss'
import InputFilter from 'features/InputFilter'
import Managers from 'features/Managers/Managers'
import SelectFilter from 'features/SelectFilter'

const ManagerManagement = () => {

  return (
    <div className={`${styles.tableContainerManagers}`}>
      <div className="card shadow mb-4">
        <div className={`card-header py-3 ${styles.flexBlock}`}>
          <h2 className={`m-0 pb-2 font-weight-bold text-primary  text ${styles.textResponsive}`}>Members List</h2>
          <div className={`${styles.filterSearchBlock} w-50`}>
            <InputFilter />
            <SelectFilter />
          </div>
        </div>
        <div className="card-body px-5  overflow-auto">
          <table className={`table table-bordered shadow-sm`}>
            <thead className={`table-light ${styles.tableHead}`}>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Managment</th>
              </tr>
            </thead>
            <tbody>
              <Managers />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManagerManagement
