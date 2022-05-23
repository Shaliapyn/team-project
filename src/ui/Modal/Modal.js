import React from "react";

import style from "../../assets/scss/modal.module.scss";

import Input from "../input/Input/Input";

import LoginButton  from "../button/LoginButton/LoginButton";

const Modal = ({active, setActive}) => {
 return (  
 <div className={style.modal}>
  <div class="shadow-lg p-5 mb-5 bg-white rounded text-center">
     <h1 class="mb-4 display-5">Add Use Form</h1>
      <div  class="mt-2">
        <Input placeholder="First Name"/>
      </div>
      <div  class="mt-2">
        <Input placeholder="Last Name"/>
      </div>
      <div  class="mt-2">
        <Input placeholder="Email"/>
      </div>
      <div  class="mt-2">
       <Input placeholder="Password"/>
      </div>
      <div class="mt-2">
       <LoginButton buttonText={"Add user"}/>
      </div>
    </div>     
  </div>
  )
}

export default Modal;