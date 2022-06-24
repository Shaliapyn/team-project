import MenuContext from 'context/MenuContext'
import React, { useRef } from 'react'
import { useState } from 'react'
import { useContext } from 'react'

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
  } = useContext(MenuContext)
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
  console.log(inputValue)
  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        <div className="col-4">
          <span>dsadsad</span>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border w-25 mr-10"
            type="number"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <span>dsadsadsadas</span>
        </div>
        <div className="col-3 text-center">
          <span>SHowind 15 of 60 elemets</span>
        </div>
      </div>
      <div className="row">
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
      </div>
    </div>
  )
}

export default Pagination
