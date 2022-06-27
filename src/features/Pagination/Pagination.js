import React from 'react'

import styles from 'assets/scss/Pagination.module.scss'

const Pagination = () => {
  const pageNumbers = []

  return (
    <div className={`d-flex justify-content-between align-items-center ${styles.container}`}>
      <div className={`${styles.flexBlock} pb-2`}>
        <span className="btn btn-outline-primary">Show</span>
        <input
          className="border w-25"
          type="number"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <span>Entries</span>
      </div>
      <div className={`pb-2`}>
        <span>Showing Entries</span>
      </div>
      <ul className="pagination">
        <li className="page-item">
          <button>
            <a className="page-link" href="#">
              Previous
            </a>
          </button>
        </li>
        {pageNumbers.map((num) => {
          return (
            <li key={num} id={num}>
              <a href="#">{num}</a>
            </li>
          )
        })}
        <li className="page-item">
          <button>
            <a className="page-link" href="#">
              Next
            </a>
          </button>
        </li>
      </ul>
    </div>
  )
}

// disabled={currentPage == pageNumbers[pageNumbers.length - 1] ? true : false} onClick={nextPage}
export default Pagination
