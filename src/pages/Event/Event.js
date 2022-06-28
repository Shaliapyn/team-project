import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { eventsCollection } from 'firebase-client'
import { collection, onSnapshot } from 'firebase/firestore'

import { setParticipants } from 'store/slices/participantsSlice'
import Participants from 'features/Participants'

import styles from 'assets/scss/event.module.scss'
import Pagination from 'features/Pagination'
import InputFilter from 'features/InputFilter'
import SelectFilter from 'features/SelectFilter'

const Event = () => {
  const location = useLocation()
  const { currentEvent } = location.state
  const dispatch = useDispatch()
  const participantsCollection = collection(eventsCollection, currentEvent.id, 'participants')
 
  useEffect(() => {
    onSnapshot(participantsCollection, (snapshot) => {
      const participantSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      dispatch(setParticipants(participantSnap))
    })
  }, [])
  
  return (
    <div className={styles.event__container} >
      <div className='d-flex flex-column align-items-start '>
        <h1 className='fs-3 mt-4 mb-4 text-primary'>Event: <b className='text-secondary'>{currentEvent.eventName}</b></h1>
        <h2 className='fs-5  text-primary'>Date: <b className='text-secondary'>{currentEvent.eventDate}</b></h2>
        <h2 className='fs-5 mb-4 text-primary'>Score: <b className='text-secondary'>{currentEvent.score}</b></h2>
      </div>
      <div className='d-flex'>
        <InputFilter />
        <SelectFilter />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Visited</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col" >Additional points</th>
            <th scope="col"></th>
            <th scope="col" >Comment</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
        <Participants currentEvent={currentEvent} />
        </tbody>
      </table>
        {/* <Pagination /> */}
    </div>
  )
}

export default Event
