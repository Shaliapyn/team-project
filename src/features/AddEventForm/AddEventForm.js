import React, { useContext, useEffect, useState } from 'react'

import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db, eventsCollection } from 'firebase-client'
import { useSelector } from 'react-redux'

import { membersState } from 'store/slices/membersSlice'

import styles from 'assets/scss/AddEventForm.module.scss'

import CloseButton from 'ui/button/CloseButton'
import Input from 'ui/input/Input/Input'

const AddEventForm = ({ closeForm }) => {
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [score, setScore] = useState('')
  const [error, setError] = useState('')
  const members = useSelector(membersState)

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
    <div className={styles.background}>
      <div className={styles.formParent} style={{ overflow: 'hidden' }}>
        <form onSubmit={createEvent} className={styles.plate}>
          <CloseButton onClick={closeForm} />
          <div className={styles.borders}>
            <h1 className={`${styles.title} text-light`}>Add Event Form</h1>
            <div className={styles.element}>
              <Input
                type={'text'}
                placeholder={'Event name'}
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <Input
                type={'date'}
                placeholder={'Event date'}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <Input type={'number'} placeholder={'Score'} value={score} onChange={(e) => setScore(e.target.value)} />
            </div>
            <div className={styles.element}>
              <button
                type="submit"
                style={{ fontSize: '18px', height: '50px' }}
                className="btn btn-primary rounded-pill w-50"
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
