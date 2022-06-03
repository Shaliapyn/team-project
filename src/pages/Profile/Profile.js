import React from 'react'
import { useSelector } from 'react-redux'

import style from '../../assets/scss/profile.module.scss'

const Profile = () => {
  const member = useSelector((state) => state.member.member)
  
  return (
    <div className={style.profile__container}>
      <div className={style.profile__content}>
        <div className={style.profile__box__avatar__text}>
          <div className={style.profile__avatar}>
            <img src={require('../../assets/images/profileAvatar.png')} alt="Profile Avatar" class="mb-3" />
            <button type="button" className={`btn btn-primary w-auto`}>
              Change avatar
            </button>
          </div>
          <div style={{ marginTop: '40px' }}>
            <p>First Name: {member.firstName} </p>
            <p>Last Name: {member.lastName} </p>
            <p>Score: {member.score}</p>
            <p>Place in the ranking</p>
          </div>
        </div>
        <div className={style.profile__btn__change__pass}>
          <button type="button" className={`btn btn-primary w-auto`}>
            Change password
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
