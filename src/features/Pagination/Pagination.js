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
    managers,
    participants,
    setInputValue,
    inputValue,
    setDataPerPage,
    currentPage,
    elementsPassed,
    minPageNumberLimit,
    maxPageNumberLimit,
  } = useContext(MenuContext)
  const allMembers = members.length
  const allManagers = managers.length
  const allEvents = events.length
  const allVisitedEvents = visitedEvents.length
  const allParticipants = participants.length
  let allElements;
  let pageNumbers = []

  const changeDataLimit = () => {
    setDataPerPage(inputValue)
  }
  switch (window.location.pathname) {
    case '/auth/event-management':
      for (let i = 1; i <= Math.ceil(allEvents / dataPerPage); i++) {
        pageNumbers.push(i)
      }
      allElements = allEvents;
      break
    case '/auth/event-list':
      for (let i = 1; i <= Math.ceil(allVisitedEvents / dataPerPage); i++) {
        pageNumbers.push(i)
      }
      allElements = allVisitedEvents
      break
    case '/auth/event-management/event':
      for (let i = 1; i <= Math.ceil(allParticipants / dataPerPage); i++) {
        pageNumbers.push(i)
      }
      allElements = allParticipants
      break
      case '/auth/manager-management':
      for (let i = 1; i <= Math.ceil(allManagers / dataPerPage); i++) {
        pageNumbers.push(i)
      }
      allElements = allManagers
      break
    default:
      for (let i = 1; i <= Math.ceil(allMembers / dataPerPage); i++) {
        pageNumbers.push(i)
      }
      allElements = allMembers
      break
  }

  return (
    <div className={`d-flex justify-content-between align-items-center ${styles.container}`}>
      <div className={`${styles.flexBlock} pb-2`}>
        <span className="btn btn-outline-primary" onClick={changeDataLimit}>
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
      <div className={`pb-2`}>
        <span>Showing {elementsPassed} of {allElements} elemets</span>
      </div>
      <ul className="pagination">
        <li className="page-item">
          <button onClick={prevPage} disabled={currentPage == pageNumbers[0] ? true : false}>
            <a className="page-link" href="#">
              Previous
            </a>
          </button>
        </li>
        {pageNumbers.map((num) => {
          if (num < maxPageNumberLimit + 1 && num > minPageNumberLimit) {
            return (
              <li key={num} id={num} className={`page-item ${currentPage === num && 'active'}`}>
                <a onClick={() => paginate(num)} className={`page-link`} href="#">
                  {num}
                </a>
              </li>
            )
          } else return null
        })}
        <li className="page-item">
          <button disabled={currentPage == pageNumbers[pageNumbers.length - 1] ? true : false} onClick={nextPage}>
            <a className="page-link" href="#">
              Next
            </a>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
