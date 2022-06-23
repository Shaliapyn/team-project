import MenuContext from 'context/MenuContext'
import React from 'react'
import { useContext } from 'react'

const Pagination = () => {
  const { dataPerPage, nextPage, prevPage, paginate, events, visitedEvents, members, participants } =
    useContext(MenuContext)
  const allMembers = members.length
  const allEvents = events.length
  const allVisitedEvents = visitedEvents.length
  const allParticipants = participants.length
  let pageNumbers = []
  switch (window.location.pathname) {
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
      case '/event-management/event':
      for (let i = 1; i <= Math.ceil(allParticipants / dataPerPage); i++) {
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
