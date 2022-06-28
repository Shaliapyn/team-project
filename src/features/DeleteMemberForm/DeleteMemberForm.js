import { collection, deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { useSelector } from 'react-redux'

import style from 'assets/scss/AddMemberForm.module.scss'
import { membersCollection, eventsCollection } from 'firebase-client'
import { memberUpState } from 'store/slices/memberUpSlice'
import { eventsState } from 'store/slices/eventsSlice'
import CloseButton from 'ui/button/CloseButton'

const DeleteMemberForm = ({ closeForm }) => {
  const member = useSelector(memberUpState)
  let memberId = member.id
  const events = useSelector(eventsState)

  const handleRemove = async (e) => {
    e.preventDefault()
    const todoDoc = doc(membersCollection, memberId)
    await deleteDoc(todoDoc)

    events &&
      events.map(async (event) => {
        const docRef = doc(eventsCollection, event.id)
        const colRef = collection(docRef, 'participants')
        await deleteDoc(doc(colRef, memberId))
      })

    closeForm()
  }
  return (
    <div className={`${style.background}`}>
      <div style={{ overflow: 'hidden' }}>
        <form onSubmit={handleRemove} className={`${style.plate} w-50 text-center flex-column align-items-center`} name="createUser">
          <CloseButton onClick={closeForm} />
          <div className={`${style.borders} w-100`}>
            <div className="card-body px-5  overflow-auto">
              <h2 className={style.title}>Are you sure, you want to delete this member?</h2>
              <table className={`table table-bordered shadow-sm table-hover`}>
                <thead className={`table-light `}>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Organisation</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Score</th>
                    <th scope="col">Birth Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ verticalAlign: 'middle' }}>
                    <td>{member.firstName}</td>
                    <td>{member.lastName}</td>
                    <td>{member.organisation}</td>
                    <td>{member.email}</td>
                    <td>{member.phone}</td>
                    <td>{member.score}</td>
                    <td>{member.birthDate}</td>
                  </tr>
                </tbody>
              </table>
              {/* <Pagination /> */}
            </div>

            <div className={`${style.element} justify-content-center`}>
              <button type="submit" style={{ fontSize: '16px' }} className="btn btn-primary rounded-pill w-25">
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeleteMemberForm
