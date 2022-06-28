import React, { useContext } from 'react'

import styles from 'assets/scss/managermanagement.module.scss'
import InputFilter from 'features/InputFilter'
import Managers from 'features/Managers/Managers'
import SelectFilter from 'features/SelectFilter'
import Pagination from 'features/Pagination'

const ManagerManagement = () => {
  return (
    <div className={styles.tableContainerManagers} >
      <h1 className='fs-3 mt-4 mb-4 text-primary'>Manager Management</h1>
      <div className='d-flex'>
        <InputFilter />
        <SelectFilter />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Management</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <Managers />
        </tbody>
      </table>
        {/* <Pagination /> */}
    </div>
  )
}

export default ManagerManagement
