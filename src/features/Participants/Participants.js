import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inputState } from 'store/slices/filterSlice'

import { participantsState } from 'store/slices/participantsSlice'
import { selectState } from 'store/slices/selectSlice'
import Participant from './Participant'

const Participants = (currentEvent) => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(inputState)
  const participants = useSelector(participantsState)
  const selected = useSelector(selectState)

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
