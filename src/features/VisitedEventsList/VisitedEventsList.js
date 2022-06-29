import React from 'react'
import { useSelector } from 'react-redux'

import { inputState } from 'store/slices/filterSlice'

import { visitedEventsState } from '../../store/slices/visitedEventsSlice'

const VisitedEventsList = () => {
  const visitedEvents = useSelector(visitedEventsState)
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
              <tr key={id} className='p-4'>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{Number(event.score) + Number(event.addPoints)}</td>
              </tr>
            ))
        : visitedEvents &&
        visitedEvents.map((event, id) => (
            <tr key={id} className='p-4'>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{Number(event.score) + Number(event.addPoints)}</td>
            </tr>
          ))}
    </>
  )
}

export default VisitedEventsList
