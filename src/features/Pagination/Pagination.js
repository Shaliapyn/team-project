import MenuContext from 'context/MenuContext'
import React from 'react'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { membersState } from 'store/slices/membersSlice'

const Pagination = () => {
  const members = useSelector(membersState)
  const allMembers = members.length
  const { membersPerPage, nextPage, prevPage, paginate } = useContext(MenuContext)
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(allMembers / membersPerPage); i++) {
    pageNumbers.push(i)
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
