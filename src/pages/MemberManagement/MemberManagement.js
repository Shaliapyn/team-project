import React, { useContext, useState } from "react"
import AddMemberForm from "../../features/AddMemberForm"

import styles from '../../assets/scss/membermanagement.module.scss'
import Members from "../../features/Members"
import MenuContext from "../../context/MenuContext"
import AddUpdateForm from "../../features/AddUpdateForm"

const MemberManagement = () => {
  const [show, setShow] = useState(false)
  const { showUpdateForm, handleEdit } = useContext(MenuContext)
  console.log(showUpdateForm)
  return (
    <div className={`${styles.tableContainerManagement}`}>
      <div>{show && <AddMemberForm closeForm={() => setShow(false)} />}</div>
      <div>{showUpdateForm && <AddUpdateForm closeForm={() => handleEdit()} />}</div>
      <div className="card shadow mb-4">
        <div className={`card-header py-3 ${styles.flexBlock}`}>
          <h2 className={`m-0 font-weight-bold text-primary  text ${styles.textResponsive}`}>Members List</h2>
          <button
            type="button"
            className={`btn btn-primary w-auto ${styles.managementBtn}`}
            onClick={() => setShow(!show)}
          >
            Add Member
          </button>
        </div>
        <div className="card-body px-5  overflow-auto">
          <table className={`table table-bordered shadow-sm `}>
            <thead className={`table-light `}>
              <tr>
                <th scope="col">Avatar</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Organisation</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Score</th>
                <th scope="col">Birth Date</th>
                <th scope="col">Managing</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tableRow}>
                <th scope="row">1</th>
                <td>Gustavus</td>
                <td>Adolphus</td>
                <td>Army</td>
                <td>@gmail</td>
                <td>+3806712494</td>
                <td>25</td>
                <td>24.05.1598</td>
                <td className={styles.btnBlock}>
                  <button type="button" className="btn btn-primary w-auto">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger w-auto">
                    Delete
                  </button>
                </td>
              </tr>
              {<Members />}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MemberManagement
