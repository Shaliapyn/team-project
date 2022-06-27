import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { onSnapshot, doc } from 'firebase/firestore'
import style from 'assets/scss/eventList.module.scss'
import { eventsCollection } from 'firebase-client'

import styles from 'assets/scss/membermanagement.module.scss'

import VisitedEventsList from 'features/VisitedEventsList'
import { addVisitedEvent } from 'store/slices/visitedEventsSlice'
import Pagination from 'features/Pagination'
import InputFilter from 'features/InputFilter'
import MenuContext from 'context/MenuContext'

const EventList = () => {
  const {showMore} = useContext(MenuContext)
  const currentMember = useSelector((state) => state.member.member)
  const dispatch = useDispatch()
  const events = useSelector((state) => state.events.events)

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
          }
        })
        if (visitedEventsByCurrentMember.length === 0) {
          dispatch(addVisitedEvent([]))
        }
      })
  }, [])

  return (
    <div className={style.container}>
      <div className="card shadow mb-4 ">
        <div className="card-header py-3 ">
          <h2 className={`m-0 font-weight-bold text-primary  text ${style.textResponsive}`}>
            The List of Visited Events
          </h2>
        </div>
        <div className="card-body px-5  overflow-auto">
        <div className={`w-100 d-flex justify-content-between ${styles.filterBlock}`}>
            <InputFilter />
          </div>
          <table className="table table-bordered table-responsive-lg table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col" className="py-3 pe-5 ps-4">
                  Name
                </th>
                <th scope="col" className="py-3  ps-4">
                  Date
                </th>
                <th scope="col" className="py-3  ps-4">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              <VisitedEventsList />
            </tbody>
          </table>
          <div className='text-center'><button className="btn btn-outline-primary w-auto mb-4" onClick={showMore}>Show More</button></div>
          {/* <Pagination /> */}
        </div>
      </div>
    </div>
  )
}

export default EventList
