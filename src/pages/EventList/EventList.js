import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import style from 'assets/scss/eventList.module.scss'
import { eventsCollection } from 'firebase-client'
import { doc, onSnapshot } from 'firebase/firestore'

import VisitedEventsList from 'features/VisitedEventsList'
import { addVisitedEvent } from 'store/slices/visitedEventsSlice'

const EventList = () => {
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
        </div>
      </div>
    </div>
  )
}

export default EventList
