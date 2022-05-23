import React from "react";

import style from "../../assets/scss/modal.module.scss";

import Input from "../input/Input/Input";

import LoginButton  from "../button/LoginButton/LoginButton";

const Modal = ({active, setActive}) => {
 return (  
 <div className={style.modal}>
  <div className={style.modal__content}>
     <h1 class="mb-4 display-5">Add Use Form</h1>
      <div  class="mt-2">
        <Input type={"text"} placeholder={"First Name"}/>
      </div>
      <div  class="mt-2">
        <Input type={"text"} placeholder={"Last Name"}/>
      </div>
      <div  class="mt-2">
        <Input type={"email"} placeholder={"Email"} />
      </div>
      <div  class="mt-2">
       <Input type={"password"} placeholder={"Password"}/>
      </div>
      <div class="mt-2">
       <LoginButton buttonText={"Add user"}/>
      </div>
    </div>     
  </div>
  )
}

export default Modal;