import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { memberState } from 'store/slices/memberSlice'

import AddMemberForm from 'features/AddMemberForm'
import Members from 'features/Members'
import MenuContext from 'context/MenuContext'
import AddUpdateForm from 'features/AddUpdateForm'
import InputFilter from 'features/InputFilter'
import SelectFilter from 'features/SelectFilter'
import DeleteMemberForm from 'features/DeleteMemberForm'

import styles from 'assets/scss/membermanagement.module.scss'

const MemberManagement = () => {
  const member = useSelector(memberState)
  const { showDeleteForm, setShowDeleteForm, showUpdateForm, handleEdit, showAddForm, setShowAddForm } =
    useContext(MenuContext)

  return (
    <div className={styles.tableContainerManagement}>
      <div>{showAddForm && <AddMemberForm closeForm={() => setShowAddForm(false)} />}</div>
      <div>{showUpdateForm && <AddUpdateForm closeForm={() => handleEdit()} />}</div>
      <div>{showDeleteForm && <DeleteMemberForm closeForm={() => setShowDeleteForm(false)} />}</div>
      <div className="d-flex align-items-center">
        <h1 className="fs-3 mt-4 mb-4 text-primary">Member Management</h1>
        {member.role === 'admin' && (
          <button
            type="button"
            className={`btn btn-primary w-auto ms-auto`}
            style={{ height: '33px' }}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            Add Member
          </button>
        )}
      </div>
      <div className="d-flex">
        <InputFilter />
        <SelectFilter />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Organisation</th>
            <th scope="col">Score</th>
            <th scope="col">Birth Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <Members />
        </tbody>
      </table>
    </div>
  )
}

export default MemberManagement
