import React from 'react'
import { useSelector } from 'react-redux'

import { visitedEventsState } from '../../store/slices/visitedEventsSlice'

const VisitedEventsList = () => {
  const visitedEvents = useSelector(visitedEventsState)

  return (
    <>
      {visitedEvents &&
        visitedEvents.map((event, id) => (
          <tr key={id}>
            <td>{event.name}</td>
            <td>{event.date}</td>
            <td>{Number(event.score) + Number(event.addPoints)}</td>
          </tr>
        ))}
      {visitedEvents.length === 0 && (
        <tr>
          <td
            className="mt-3 align-middle fs-4 text-secondary"
            colSpan="3"
            style={{ textAlign: 'center', height: '140px' }}
          >
            You haven't visited any events
          </td>
        </tr>
      )}
    </>
  )
}

export default VisitedEventsList
