import MenuContext from 'context/MenuContext'
import React from 'react'
import { useContext } from 'react'

import styles from 'assets/scss/Pagination.module.scss'

const Pagination = () => {
  const {
    dataPerPage,
    nextPage,
    prevPage,
    paginate,
    events,
    visitedEvents,
    members,
    participants,
    setInputValue,
    inputValue,
    setDataPerPage,
    elemetsPassed,
  } = useContext(MenuContext)
  const allMembers = members.length
  const allEvents = events.length
  const allVisitedEvents = visitedEvents.length
  const allParticipants = participants.length
  let pageNumbers = []

  const rered = () => {
    setDataPerPage(inputValue)
    console.log(elemetsPassed)
  }
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
    <div className="container">
      <div className={styles.flexBlock}>
        <span className="btn btn-outline-primary" onClick={rered}>
          Show
        </span>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border w-25"
          type="number"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />

        <span>Elemets</span>
      </div>
      {/* <div>
          <span>SHowind {dataPerPage} of 60 elemets</span>
        </div> */}
      <nav className="d-flex justify-content-center pt-3" aria-label="Page navigation example">
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
    </div>
  )
}

export default Pagination
