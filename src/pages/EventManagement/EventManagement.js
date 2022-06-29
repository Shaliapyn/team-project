import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AddEventForm from 'features/AddEventForm'
import styles from 'assets/scss/eventManagement.module.scss'
import Pagination from 'features/Pagination'
import InputFilter from 'features/InputFilter'
import { inputState } from 'store/slices/filterSlice'

const EventManagement = () => {
  const [show, setShow] = useState(false)
  const events = useSelector((state) => state.events.events)
  const searchTerm = useSelector(inputState)
  
  const eventsList =
    events &&
    events
      .filter((member) => {
        if (searchTerm === '') return member
        else if (member.eventName.toLowerCase().includes(searchTerm.toLowerCase())) {
          return member
        }
      })
      .map((event) => {
        return (
          <tr key={event.id} className='p-4'>
            <td className="fs-5">
              <Link to="event" state={{ currentEvent: event }}>
                {event.eventName}
              </Link>
            </td>
            <td >{event.eventDate}</td>
            <td >{event.score}</td>
          </tr>
        )
    })

  return (
    <div className={styles.container} >
      <div>{show && <AddEventForm closeForm={() => setShow(false)} />}</div>
      <div className='d-flex align-items-center'>
        <h1 className='fs-3 mt-4 mb-4 text-primary'>Event Management</h1>
        <button
            type="button"
            className={`btn btn-primary w-auto ms-auto fs-5`}
            onClick={() => setShow(!show)}
          >
            Add Event
        </button>
      </div>
      <div className='d-flex'>
        <InputFilter />
      </div>
      <table className='table'>
        <thead>
          <tr className='p-4'>
            <th scope="col">Event Name</th>
            <th scope="col">Date</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {eventsList}
        </tbody>
      </table>
        {/* <Pagination /> */}
    </div>
  )
}

export default EventManagement
