import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import styles from 'assets/scss/profile.module.scss'
import AvatarForm from 'features/AvatarForm'
import { membersState } from 'store/slices/membersSlice'
import ChangePasswordForm from 'features/ChangePasswordForm'

const Profile = () => {
  const currentMember = useSelector((state) => state.member.member)
  const members = useSelector(membersState)
  let ratingList = []
  const [showChangePassForm, setShowChangePassForm] = useState(false)

  members &&
    members.map((member) => {
      ratingList.push(member.score)
    })

  ratingList.sort((a, b) => b - a)
  const nth = (n) => ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th'
  const ratingPlace = ratingList.indexOf(currentMember.score) + 1
  const suffixRatingPlace = nth(ratingPlace)
 

  return (
    <div className={styles.container}>
      <h1 className='fs-3 mt-4 mb-4 text-primary align-self-start'>Profile</h1>
      <div className={styles.profile__container}>
        <div className='d-flex flex-column flex-nowrap align-items-center justify-content-center w-75'>
          <div className='m-5 text-center'>
            <AvatarForm />
          </div>
          <hr className='w-100 bg-info mt-0'/>
          <div className='d-flex align-items-center justify-content-between w-100'>
            <ul className='text-start p-0'>
              <li className='p-2'>First Name:</li>
              <li className='p-2'>Last Name:</li>
              <li className='p-2'>Score:</li>
              <li className='p-2'>Place in the rating:</li>
            </ul>
            <ul className='text-end '>
              <li className='p-2'><b>{currentMember.firstName}</b></li>
              <li className='p-2'><b>{currentMember.lastName}</b></li>
              <li className='p-2'><b>{currentMember.score}</b></li>
              <li className='p-2'><b>{ratingPlace}<sup>{suffixRatingPlace}</sup> out of {ratingList.length}</b></li>
            </ul>
          </div>
        </div>
        <div className='my-5'>
          <button
            type="button"
            className={`btn btn-primary w-auto`}
            onClick={() => setShowChangePassForm(!showChangePassForm)}
          >
            Change password
          </button>
        </div>
        <div>{showChangePassForm && <ChangePasswordForm closeForm={() => setShowChangePassForm(false)} />}</div>
      </div>
    </div>
  )
}

export default Profile
