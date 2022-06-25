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
    currentPage,
    currentMembersPage,
    elementsPassed,
    minPageNumberLimit,
    maxPageNumberLimit,
  } = useContext(MenuContext)
  const allMembers = members.length
  const allEvents = events.length
  const allVisitedEvents = visitedEvents.length
  const allParticipants = participants.length
  let pageNumbers = []

  const rered = () => {
    setDataPerPage(inputValue)
    console.log(currentMembersPage.length)
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
    <div className={`d-flex justify-content-between align-items-center ${styles.container}`}>
      <div className={`${styles.flexBlock} pb-2`}>
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
      <div className={`pb-2`}>
        <span>SHowind {elementsPassed} of 60 elemets</span>
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
