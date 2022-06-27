import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { updateDoc, doc } from 'firebase/firestore'
import { eventsCollection } from 'firebase-client'
import { membersState } from 'store/slices/membersSlice'
import Comment from 'features/Comment'
import { membersCollection } from 'firebase-client'

const Participant = ({ participant, currentEvent }) => {
  let additionalPoints = participant.addPoints
  let visited = participant.visitedEvent

  let updatedScore

  const [inputPoints, setInputPoints] = useState(0)
  const members = useSelector(membersState)
  const currentMember = members && members.find((member) => member.id === participant.id)
  const event = currentEvent.currentEvent

  const updatePoints = async (additionalPoints) => {
    const docRef = doc(eventsCollection, event.id, 'participants', participant.id)

    await updateDoc(docRef, {
      addPoints: additionalPoints,
    })
  }

  const updateVisitedState = async (visited) => {
    const docRef = doc(eventsCollection, event.id, 'participants', participant.id)

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
    if (participant.visitedEvent) {
      updateMemberScore(currentMember.score + inputPoints)
    }
  }
  const decreasePoints = () => {
    additionalPoints -= inputPoints
    updatePoints(additionalPoints)
    if (participant.visitedEvent) {
      updateMemberScore(currentMember.score - inputPoints)
    }
  }

  const changeVisitedState = () => {
    visited = !visited
    updateVisitedState(visited)

    if (visited) {
      updatedScore = currentMember.score + event.score + participant.addPoints
    } else {
      updatedScore = currentMember.score - event.score - participant.addPoints
      updatePoints(0)
    }
    updateMemberScore(updatedScore)
  }

  return (
    <tr style={{ backgroundColor: visited ? '#edf6f8' : 'white' }}>
      <td>
        <input type="checkbox" checked={visited ? true : false} onChange={changeVisitedState} />
      </td>
      <td>
        <img src={require('../../../assets/images/eventAvatar.png')} alt="Profile Avatar" />
      </td>
      <td>{currentMember.firstName}</td>
      <td>{currentMember.lastName}</td>
      <td>{participant.addPoints}</td>
      <td className="w-auto">
        <form>
          <div className="input-group" style={{ width: '190px' }}>
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
      <td style={{ textAlign: 'center' }}>
        <Comment participant={participant} currentEvent={currentEvent} />
      </td>
    </tr>
  )
}
export default Participant
