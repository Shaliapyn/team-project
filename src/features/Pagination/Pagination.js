import MenuContext from 'context/MenuContext'
import React, { useEffect } from 'react'
import { useContext } from 'react'

import styles from 'assets/scss/Pagination.module.scss'

const Pagination = () => {
  const {
    filteredMembers,
    dataPerPage,
    nextPage,
    prevPage,
    paginate,
    managers,
    participants,
    setInputValue,
    inputValue,
    setDataPerPage,
    currentPage,
    elementsPassed,
    setElementsPassed,
    minPageNumberLimit,
    maxPageNumberLimit,
    currentMembersPage,
    currentManagersPage
  } = useContext(MenuContext)
  const allEntries = filteredMembers.length
  const allManagers = managers.length
  const allParticipants = participants.length
  let allElements;
  let passedFrom;
  let pageNumbers = []

  const changeDataLimit = () => {
    setDataPerPage(inputValue)
  }
  switch (window.location.pathname) {
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
      passedFrom = elementsPassed-currentManagersPage.length+1
      break
    default:
      for (let i = 1; i <= Math.ceil(allEntries / dataPerPage); i++) {
        pageNumbers.push(i)
      }
      allElements = allEntries
      passedFrom = elementsPassed-currentMembersPage.length+1
      break
  }
    setElementsPassed(() =>{
      if(currentPage !== pageNumbers[pageNumbers.length-1]){
        return currentPage * currentMembersPage.length
      } else return allElements
    })
    
  
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
        <span>Entries</span>
      </div>
      <div className={`pb-2`}>
        <span>Showing {passedFrom} to {elementsPassed} of {allElements} Entries</span>
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
