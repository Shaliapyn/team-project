
import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelected} from 'store/slices/selectSlice'


const SelectFilter = ({filterMembers}) => {
    const dispatch = useDispatch()
    const filterr = (e) => {
        dispatch(setSelected(e.target.value))
    }
  return (
    <div>
        <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">
                  Filter
                </label>
              </div>
              <select onChange={filterr} className="custom-select w-45" id="inputGroupSelect01">
                <option value="All">
                  All
                </option>
                <option value="Managers">Managers</option>
                <option value="Users">Users</option>
              </select>
            </div>
    </div>
  )
}

export default SelectFilter