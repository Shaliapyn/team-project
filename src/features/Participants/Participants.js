import React from 'react'
import { useSelector } from 'react-redux'

import { participantsState } from 'store/slices/participantsSlice'
import Participant from './Participant'

const Participants = (currentEvent) => {
  const participants = useSelector(participantsState)

  return (
    <>
      {participants &&
        participants.map((participant, id) => (
          <Participant key={id} participant={participant} currentEvent={currentEvent} />
        ))}
    </>
  )
}

export default Participants
