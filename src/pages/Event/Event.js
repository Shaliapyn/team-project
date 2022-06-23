import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { eventsCollection } from 'firebase-client'
import { collection, onSnapshot } from 'firebase/firestore'

import { setParticipants } from 'store/slices/participantsSlice'
import Participants from "features/Participants"

import style from 'assets/scss/event.module.scss'

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
          <table className="table table-hover align-middle">
            <tbody>{<Participants currentEvent={currentEvent} />}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Event
