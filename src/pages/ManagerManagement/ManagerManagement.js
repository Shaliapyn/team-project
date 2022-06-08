import React, { useState } from 'react'

import styles from '../../assets/scss/managermanagement.module.scss'
import MakeManagerForm from '../../features/MakeManagerForm'
import Managers from '../../features/Managers/Managers'

const ManagerManagement = () => {
  const [show, setShow] = useState(false)
  return (
    <div className={`${styles.tableContainerManagers}`}>
      <div>{show && <MakeManagerForm closeForm={() => setShow(false)} />}</div>
      <div className="card shadow mb-4">
        <div className={`card-header py-3 ${styles.flexBlock}`}>
          <h2 className={`m-0 font-weight-bold text-primary  text ${styles.textResponsive}`}>Managers List</h2>
          <button onClick={()=> setShow(!show)} type="button" className={`btn btn-primary w-auto ${styles.managementBtn}`}>
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
              <Managers />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManagerManagement
