import MenuContext from 'context/MenuContext'
import React from 'react'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { eventsState } from 'store/slices/eventsSlice'
import { membersState } from 'store/slices/membersSlice'
import { visitedEventsState } from 'store/slices/visitedEventsSlice'

const Pagination = () => {
  const members = useSelector(membersState)
  const events = useSelector(eventsState)
  const visitedEvents = useSelector(visitedEventsState)
  const allMembers = members.length
  const allEvents = events.length
  const allVisitedEvents = visitedEvents.length
  const { dataPerPage, nextPage, prevPage, paginate } = useContext(MenuContext)
  let pageNumbers = []
  switch(window.location.pathname) {
    case '/auth/event-management':
      for (let i = 1; i <= Math.ceil(allEvents / dataPerPage); i++) {
        pageNumbers.push(i)
      }
      break
    case '/auth/event-list':
      for (let i = 1; i <= Math.ceil(allVisitedEvents / dataPerPage); i++) {
        pageNumbers.push(i)
      }
      break
    default:
      for (let i = 1; i <= Math.ceil(allMembers / dataPerPage); i++) {
        pageNumbers.push(i)
      }
      break
  }

  return (
    <nav className="d-flex justify-content-center" aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a onClick={prevPage} className="page-link" href="/#">
            Previous
          </a>
        </li>
        {pageNumbers.map((num, i) => (
          <li key={i} className="page-item">
            <a onClick={() => paginate(num)} className="page-link" href="#">
              {num}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a onClick={nextPage} className="page-link" href="/#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
