import React from 'react'
import { useDispatch } from 'react-redux'
import { setInput } from 'store/slices/filterSlice'

const InputFilter = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <div className="input-group mb-3 w-70">
        <input
          onChange={(e) => dispatch(setInput(e.target.value))}
          placeholder="Search"
          type="text"
          className="form-control input-group"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          style={{height: '33px'}}
        />
      </div>
    </div>
  )
}

export default InputFilter
