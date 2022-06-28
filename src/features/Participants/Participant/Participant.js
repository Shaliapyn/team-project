import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { updateDoc, doc } from 'firebase/firestore'
import { eventsCollection } from 'firebase-client'
import { membersState } from 'store/slices/membersSlice'
import Comment from 'features/Comment'
import { membersCollection } from 'firebase-client'

import styles from 'assets/scss/event.module.scss'

const Participant = ({ participant, currentEvent }) => {
  const defaultPhoto = 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
  // if (!participant) {window.location.reload(false)}
  let currentParticipant = participant
  let additionalPoints = currentParticipant.addPoints
  let visited = currentParticipant.visitedEvent
  
  let updatedScore

  const [inputPoints, setInputPoints] = useState(0)
  const members = useSelector(membersState)
  const currentMember = members.find((member) => member.id === currentParticipant.id)
  const event = currentEvent.currentEvent
  
  const updatePoints = async (additionalPoints) => {
    const docRef = doc(eventsCollection, event.id, 'participants', currentParticipant.id)

    await updateDoc(docRef, {
      addPoints: additionalPoints,
    })
  }

  const updateVisitedState = async (visited) => {
    const docRef = doc(eventsCollection, event.id, 'participants', currentParticipant.id)

    await updateDoc(docRef, {
      visitedEvent: visited,
    })
  }

  const updateMemberScore = async (points) => {
    const docRef = doc(membersCollection, currentMember.id)

    await updateDoc(docRef, {
      score: points,
    })
  }

  const increasePoints = () => {
    additionalPoints += inputPoints
    updatePoints(additionalPoints)
    if (currentParticipant.visitedEvent) {
      updateMemberScore(currentMember.score + inputPoints)
    }
  }
  const decreasePoints = () => {
    additionalPoints -= inputPoints
    updatePoints(additionalPoints)
    if (currentParticipant.visitedEvent) {
      updateMemberScore(currentMember.score - inputPoints)
    }
  }

  const changeVisitedState = () => {
    visited = !visited
    updateVisitedState(visited)

    if (visited) {
      updatedScore = currentMember.score + event.score + currentParticipant.addPoints
    } else {
      updatedScore = currentMember.score - event.score - currentParticipant.addPoints
      updatePoints(0)
    }
    updateMemberScore(updatedScore)
  }

  return (
    <tr style={{ backgroundColor: visited ? '#edf6f8' : 'white' }}>
      <td className="ps-0">
        <div className='d-flex align-items-center justify-content-center'>
          <img src={currentMember.userPhoto || defaultPhoto} alt="avatar" className={styles.avatar} type={`image / png`}></img>
        </div>
      </td>
      <td>
        <input type="checkbox" checked={visited ? true : false} onChange={changeVisitedState} />
      </td>
      <td>{currentMember.firstName}</td>
      <td>{currentMember.lastName}</td>
      <td >{currentParticipant.addPoints}</td>
      <td className="w-auto ps-0">
        <form className='d-flex align-items-center justify-content-center '>
          <div className="input-group" style={{ width: '190px'}}>
            <input
              type="text"
              className="form-control"
              placeholder="Additional points"
              onChange={(e) => setInputPoints(Number(e.target.value))}
            />
            <button className="btn btn-outline-secondary" type="button" onClick={increasePoints}>
              +
            </button>
            <button className="btn btn-outline-secondary" type="button" onClick={decreasePoints}>
              -
            </button>
          </div>
        </form>
      </td>
      <td className="ps-0 ">
        <div className='d-flex align-items-center justify-content-center'>
          <Comment participant={currentParticipant} currentEvent={currentEvent} />
        </div>
      </td>
    </tr>
  )
}
export default Participant
