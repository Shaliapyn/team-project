import React from 'react'
import { useDispatch } from 'react-redux'
import { setInput } from '../../store/slices/filterSlice'

const InputFilter = () => {
    const dispatch = useDispatch()
  return (
    <div>
        <div className="input-group mb-3 w-70">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Search
                </span>
              </div>
              <input
                onChange={(e) => dispatch(setInput((e.target.value)))}
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
    </div>
  )
}

export default InputFilter