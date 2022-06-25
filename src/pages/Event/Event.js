import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { eventsCollection } from 'firebase-client'
import { collection, onSnapshot } from 'firebase/firestore'

import { setParticipants } from 'store/slices/participantsSlice'
import Participants from "features/Participants"

import styles from 'assets/scss/membermanagement.module.scss'

import style from 'assets/scss/event.module.scss'
import Pagination from 'features/Pagination'
import InputFilter from 'features/InputFilter'
import SelectFilter from 'features/SelectFilter'
import { useContext } from 'react'
import MenuContext from 'context/MenuContext'

const Event = () => {
  const {showMore} = useContext(MenuContext)
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
    <div className={style.event__container}>
      <div className={style.event__box__text}>
        <p>
          Event Name: <b>{currentEvent.eventName}</b>{' '}
        </p>
        <p>
          Date: <b>{currentEvent.eventDate}</b>{' '}
        </p>
        <p>
          Score: <b>{currentEvent.score}</b>
        </p>
      </div>
      <div className="card shadow mb-4 ">
        <div className="card-header py-3 ">
          <h2 className={`m-0 font-weight-bold text-primary  text ${style.textResponsive}`}>Participants:</h2>
        </div>
        <div className="card-body overflow-auto">
        <div className={`w-100 d-flex justify-content-between ${styles.filterBlock}`}>
            <InputFilter />
            <SelectFilter />
          </div>
          <table className="table table-hover align-middle">
            <tbody>{<Participants currentEvent={currentEvent} />}</tbody>
          </table>
          <div className='text-center'><button className="btn btn-outline-primary w-auto mb-4" onClick={showMore}>Show More</button></div>
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default Event
