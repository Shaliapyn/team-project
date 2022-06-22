import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db, eventsCollection } from '../../firebase-client'

import { memberState } from '../../store/slices/membersSlice'
import CloseButton from '../../ui/button/CloseButton'
import Input from '../../ui/input/Input/Input'

import style from '../../assets/scss/AddEventForm.module.scss'

const AddEventForm = ({ closeForm }) => {
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [score, setScore] = useState('')
  const [error, setError] = useState('')
  const members = useSelector(memberState)

  const createEvent = async (e) => {
    e.preventDefault()
    setError('')

    const createdDocRef = await addDoc(eventsCollection, {
      eventName: eventName,
      eventDate: eventDate,
      score: parseInt(score),
    }).catch((err) => {
      setError(err.message)
      console.error(error)
    })
    const docRef = doc(db, 'events', createdDocRef.id)
    const colRef = collection(docRef, 'participants')

    members &&
      members.map(
        async (member, id) =>
          await setDoc(doc(colRef, member.id), {
            addPoints: 0,
            comment: '',
            visitedEvent: false,
          })
      )

    setEventName('')
    setEventDate('')
    setScore('')
  }

  return (
    <div className={style.background}>
      <div style={{ overflow: 'hidden' }}>
        <form onSubmit={createEvent} className={style.plate}>
          <CloseButton onClick={closeForm} />
          <div className={style.borders}>
            <h1 className={style.title}>Add Event Form</h1>
            <div className={style.element}>
              <Input
                type={'text'}
                placeholder={'Event name'}
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input
                type={'date'}
                placeholder={'Event date'}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input 
                type={'number'} 
                placeholder={'Score'} 
                value={score} 
                onChange={(e) => setScore(e.target.value)} 
              />
            </div>
            <div className={style.element}>
              <button
                type="submit"
                style={{ fontSize: '18px', height: '50px' }}
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
