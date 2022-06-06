import React, { useState } from 'react'

import AddEventForm from '../../features/AddEventForm'
import style from '../../assets/scss/eventManagement.module.scss'

const EventManagement = () => {
  const [show, setShow] = useState(false)

  return (
    <div className={style.container}>
      <div>{show ? <AddEventForm closeForm={() => setShow(false)} /> : null}</div>
      <div className="card shadow mb-4 ">
        <div className={`card-header py-3 ${style.flexBlock}`}>
          <h2 className={`m-0 font-weight-bold text-primary  text ${style.textResponsive}`}>The Events Management</h2>
          <button
            type="button"
            className={`btn btn-primary w-auto ${style.managementBtn}`}
            onClick={() => setShow(!show)}
          >
            Add Event
          </button>
        </div>
        <div className={style.button__wrapper}></div>

        <div className="card-body px-5  overflow-auto">
          <table className="table table-bordered table-responsive-lg table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col" className="py-3 pe-5 ps-4">
                  Name
                </th>
                <th scope="col" className="py-3  ps-4">
                  Date
                </th>
                <th scope="col" className="py-3  ps-4">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 pe-5 ps-4">Mark gbfbf h hrth</td>
                <td className="py-3  ps-4">12.12.2022</td>
                <td className="py-3  ps-4">15</td>
              </tr>
              <tr>
                <td className="py-3 pe-5 ps-4">Mark</td>
                <td className="py-3 ps-4">03.11.2020</td>
                <td className="py-3  ps-4">100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EventManagement
