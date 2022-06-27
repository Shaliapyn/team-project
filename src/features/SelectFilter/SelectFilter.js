import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelected } from 'store/slices/selectSlice'

const SelectFilter = () => {
  const dispatch = useDispatch()
  const filterr = (e) => {
    dispatch(setSelected(e.target.value))
  }
  return window.location.pathname === '/auth/event-management/event' ? (
    <div>
      <div className="input-group mb-3">
        <select onChange={filterr} className="form-select w-45" aria-label="Default select example">
          <option value="All">All</option>
          <option value="Visited">Visited</option>
          <option value="NotVisited">Not Visited</option>
        </select>
      </div>
    </div>
  ) : (
    <div>
      <div className="input-group mb-3">
        <select onChange={filterr} className="form-select w-45" aria-label="Default select example">
          <option value="All">All</option>
          <option value="Managers">Managers</option>
          <option value="Users">Users</option>
        </select>
      </div>
    </div>
  )
}

export default SelectFilter
