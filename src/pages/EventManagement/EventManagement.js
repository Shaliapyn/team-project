import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from 'assets/scss/membermanagement.module.scss'

import AddEventForm from 'features/AddEventForm'
import style from 'assets/scss/eventManagement.module.scss'
import Pagination from 'features/Pagination'
import MenuContext from 'context/MenuContext'
import InputFilter from 'features/InputFilter'
import { inputState } from 'store/slices/filterSlice'
import { setFilteredMembers } from 'store/slices/filteredMembersSlice'

const EventManagement = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const events = useSelector((state) => state.events.events)
  const { currentMembersPage } = useContext(MenuContext)
  const searchTerm = useSelector(inputState)

  useEffect(() => {
    dispatch(setFilteredMembers(events
      .filter((event) => {
        if (searchTerm === '') return event
        else if (
          event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return event
        }
      })))
  }, [searchTerm, events])
  const eventsList = currentMembersPage &&
    currentMembersPage.map((event) => {
        return (
          <tr key={event.id}>
            <td className="py-3 pe-5 ps-4 fs-5">
              <Link to="event" state={{ currentEvent: event }}>
                {event.eventName}
              </Link>
            </td>
            <td className="py-3  ps-4">{event.eventDate}</td>
            <td className="py-3  ps-4">{event.score}</td>
          </tr>
        )
      })

  return (
    <div className={style.container}>
      <div>{show ? <AddEventForm closeForm={() => setShow(false)} /> : null}</div>
      <div className="card shadow mb-4 ">
        <div className={`card-header py-3 ${style.flexBlock}`}>
          <h2 className={`m-0 font-weight-bold text-primary  text ${style.textResponsive}`}>The List of all Events</h2>
          <button
            type="button"
            className={`btn btn-primary w-auto ${style.managementBtn}`}
            onClick={() => setShow(!show)}
          >
            Add Event
          </button>
        </div>
        <div className={style.button__wrapper}></div>

        <div className="card-body px-5  overflow-auto">
          <div className={`w-100 d-flex justify-content-between ${styles.filterBlock}`}>
            <InputFilter />
          </div>
          <table className="table table-bordered table-responsive-lg table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col" className="py-3 pe-5 ps-4">
                  {' '}
                  Name{' '}
                </th>
                <th scope="col" className="py-3  ps-4">
                  {' '}
                  Date{' '}
                </th>
                <th scope="col" className="py-3  ps-4">
                  {' '}
                  Score{' '}
                </th>
              </tr>
            </thead>
            <tbody>{eventsList}</tbody>
          </table>
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default EventManagement
