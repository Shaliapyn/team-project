import React from 'react';
import style from "../../assets/scss/profile.module.scss";

import { LargeButton } from '../../ui/button/LargeButton/LargeButton';
import { SmallButton } from '../../ui/button/SmallButton/SmallButton';

const Profile = () => {
  return (
    <div className={style.container}>
      <div className={style.box__avatar__text}>
        <div className={style.avatar} >

        <img src={require("../../assets/images/profileAvatar.png")} alt="Profile Avatar" class="mb-3"/>
          <SmallButton buttonText={"Change avatar"}/>

      </div>
      <div className={style.text}>
        <p>First Name</p>
        <p>Last Name</p>
        <p>Score</p>
        <p>Place in the ranking</p>
      </div>
      </div>
       <div className={style.btn__change__pass}>

        <LargeButton buttonText={"Change password"}/>

      </div>
    </div>
  )
}

export default Profile