import React from 'react'

import styles from 'assets/scss/memberlist.module.scss'
import Members from 'features/Members'
import Pagination from 'features/Pagination'
import InputFilter from 'features/InputFilter'

const MemberList = () => {
  return (
    <div className={styles.tableContainer} >
      <h1 className='fs-3 mt-4 mb-4 text-primary'>Member List</h1>
      <div className='d-flex'>
        <InputFilter />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Organisation</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <Members />
        </tbody>
      </table>
        {/* <Pagination /> */}
    </div>
  )
}

export default MemberList
