import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { onSnapshot, doc } from 'firebase/firestore'
import styles from 'assets/scss/eventList.module.scss'
import { eventsCollection } from 'firebase-client'

import VisitedEventsList from 'features/VisitedEventsList'
import { addVisitedEvent } from 'store/slices/visitedEventsSlice'
import InputFilter from 'features/InputFilter'

const EventList = () => {
  const currentMember = useSelector((state) => state.member.member)
  const dispatch = useDispatch()
  const events = useSelector((state) => state.events.events)
  const [empty, setEmpty] = useState(false)

  useEffect(() => {
    let visitedEventsByCurrentMember = []

    events &&
      events.map((event) => {
        const docRef = doc(eventsCollection, event.id, 'participants', currentMember.id)
        let visitedEvent

        onSnapshot(docRef, (doc) => {
          if (doc.data().visitedEvent) {
            visitedEvent = {
              name: event.eventName,
              date: event.eventDate,
              score: event.score,
              addPoints: doc.data().addPoints,
            }
            visitedEventsByCurrentMember = [...visitedEventsByCurrentMember, visitedEvent]
            dispatch(addVisitedEvent(visitedEventsByCurrentMember))
            setEmpty(false)
          }
        })
        if (visitedEventsByCurrentMember.length === 0) {
          dispatch(addVisitedEvent([]))
          setEmpty(true)
        }
      })
  }, [])

  return (
    <div className={styles.container}>
      <h1 className="fs-3 mt-4 mb-4 text-primary">The List of Visited Events</h1>
      {!empty && (
        <div className="d-flex">
          <InputFilter />
        </div>
      )}
      {empty && (
        <div className="d-flex mt-5 align-middle justify-content-center fs-4 text-secondary">
          You haven't visited any events
        </div>
      )}
      {!empty && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">Date</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <VisitedEventsList />
          </tbody>
        </table>
      )}
    </div>
  )
}

export default EventList
