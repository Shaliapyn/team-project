import MenuContext from 'context/MenuContext'
import React, { useContext } from 'react'

import { useSelector } from 'react-redux'
import { inputState } from 'store/slices/filterSlice'

import { visitedEventsState } from '../../store/slices/visitedEventsSlice'

const VisitedEventsList = () => {
  const visitedEvents = useSelector(visitedEventsState)
  const { currentVisitedEventsPage } = useContext(MenuContext)
  const searchTerm = useSelector(inputState)
  return (
    <>
      {searchTerm
        ? visitedEvents
            .filter((event) => {
              if (searchTerm === '') return event
              else if (event.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return event
              }
            })
            .map((event, id) => (
              <tr key={id}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{Number(event.score) + Number(event.addPoints)}</td>
              </tr>
            ))
        : currentVisitedEventsPage &&
          currentVisitedEventsPage.map((event, id) => (
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
