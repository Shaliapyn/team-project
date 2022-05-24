import React from "react";
import style from "../../assets/scss/AddEventForm.module.scss";
import Button from "../../ui/button/Button";
import CloseButton from "../../ui/button/CloseButton";
import Input from "../../ui/input/Input/Input";

const AddEventForm = () => {
  console.log(style.container);

  return (
    <div className={style.container}>
      <div className={style.plate}>
		  <CloseButton />
		  
        <div className={style.borders}>
          <h1 className={style.title}>Add Event Form</h1>

          <div className={style.element}>
            <Input type={"text"} placeholder={"Event name"} />
          </div>

          <div className={style.element}>
            <Input type={"date"} />
          </div>

          <div className={style.element}>
            <Input type={"number"} placeholder={"Score (max. 10)"} min={"1"} max={"10"} />
          </div>

          <div className={style.element}>
            <Button label={'Add event'} className={'btn-primary btn-block'} style={{height: '50px'}}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;
