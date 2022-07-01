import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { eventsCollection } from 'firebase-client'
import { collection, onSnapshot } from 'firebase/firestore'

import { setParticipants } from 'store/slices/participantsSlice'
import Participants from 'features/Participants'

import styles from 'assets/scss/event.module.scss'
import InputFilter from 'features/InputFilter'
import SelectFilter from 'features/SelectFilter'
import Spinner from 'features/Spinner'

const Event = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { currentEvent } = location.state
  const participantsCollection = collection(eventsCollection, currentEvent.id, 'participants')

  const [isLoading, setIsLoading] = useState(true)
  const participants = useSelector((state) => state.participants.participants)
  
  useEffect(() => {
    onSnapshot(participantsCollection, (snapshot) => {
      const participantSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      dispatch(setParticipants(participantSnap))
      setIsLoading(false)
    })
  }, [])
  
  return (
    <div className={styles.event__container}>
      <div className="d-flex flex-column align-items-start ">
        <h1 className="fs-3 mt-4 mb-4 text-primary">
          Event: <b className="text-secondary">{currentEvent.eventName}</b>
        </h1>
        <h2 className="fs-5  text-primary">
          Date: <b className="text-secondary">{currentEvent.eventDate}</b>
        </h2>
        <h2 className="fs-5 mb-4 text-primary">
          Score: <b className="text-secondary">{currentEvent.score}</b>
        </h2>
      </div>
      <div className="d-flex">
        <InputFilter />
        <SelectFilter />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Visited</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Additional points</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-group-divider">

          {!isLoading && participants.length && <Participants currentEvent={currentEvent} /> } 
          {isLoading && <Spinner /> } 

        </tbody>
      </table>
    </div>
  )
}

export default Event
