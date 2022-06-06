import React, { useState } from 'react'

import {collection, addDoc} from "firebase/firestore";
import {db} from '../../firebase-client';

import style from '../../assets/scss/AddEventForm.module.scss'

import CloseButton from '../../ui/button/CloseButton'
import Input from '../../ui/input/Input/Input'

const AddEventForm = ({ closeForm }) => {

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState('');

  const createEvent = (e) => {
    e.preventDefault();
    setError('');

    addDoc(collection(db, "events"), {
          eventName: eventName,
          eventDate: eventDate,
          score: score,
      })      
      .catch(err => {
        setError(err.message);
        console.error(error);
      });
    
    setEventName('');
    setEventDate('');
    setScore('');
  }

  return (
    <div className={style.background}>
      <div style={{ overflow: 'hidden' }}>
        <form onSubmit={createEvent} className={style.plate} >
          <CloseButton onClick={closeForm} />
          <div className={style.borders}>
            <h1 className={style.title}>Add Event Form</h1>
            <div className={style.element}>
              <Input 
                type={"text"} 
                placeholder={"Event name"}
                value={eventName}
                onChange={e => setEventName(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input 
                type={"date"} 
                placeholder={"Event date"} 
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}  
              />
            </div>
            <div className={style.element}>
              <Input 
                type={"number"} 
                placeholder={"Score"} 
                value={score}
                onChange={e => setScore(e.target.value)}  
              />
            </div>
            <div className={style.element}>
              <button 
                type="submit" 
                style={{fontSize: "18px", height: '50px'}} 
                className="btn btn-primary rounded-pill w-100"
              >
                Add Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEventForm
