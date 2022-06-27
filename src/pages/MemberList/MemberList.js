import React from 'react'

import styles from 'assets/scss/memberlist.module.scss'
import Members from 'features/Members'
import Pagination from 'features/Pagination'
import InputFilter from 'features/InputFilter'
import SelectFilter from 'features/SelectFilter'

const MemberList = () => {
  return (
    <div className={`${styles.tableContainer}`}>
      <div className="card shadow mb-4">
        <div className={`card-header py-3 ${styles.flexBlock}`}>
          <h2 className="m-0 font-weight-bold text-primary fs-5 text">Members List</h2>
          <div style={{ width: '200px' }}></div>
        </div>
        <div className="card-body px-5 overflow-auto">
          <div className={`w-100 d-flex justify-content-between ${styles.filterSearchBlock}`}>
            <InputFilter />
            <SelectFilter />
          </div>
          <table className={`table table-bordered shadow-sm table-hover`}>
            <thead className={`table-light ${styles.tableHead}`}>
              <tr>
                <th scope="col">Avatar</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Organisation</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>{<Members />}</tbody>
          </table>
          {/* <Pagination /> */}
        </div>
      </div>
    </div>
  )
}

export default MemberList
