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
      <h1 className='fs-3 mt-4 mb-4 text-primary'>Profile</h1>
      <div className={styles.profile__container}>
        <div className={styles.profile__box__avatar__text}>
          <div className={styles.profile__avatar}>
            <AvatarForm />
          </div>
          <div style={{ marginTop: '40px' }}>
            <p>
              First Name: <b>{currentMember.firstName}</b>
            </p>
            <p>
              Last Name: <b>{currentMember.lastName}</b>
            </p>
            <p>
              Score: <b>{currentMember.score}</b>
            </p>
            <p>
              Place in the rating:{' '}
              <b>
                {ratingPlace}
                <sup>{suffixRatingPlace}</sup> out of {ratingList.length}
              </b>
            </p>
          </div>
        </div>
        <div className={styles.profile__btn__change__pass}>
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
