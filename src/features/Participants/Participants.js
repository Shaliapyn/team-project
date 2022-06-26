import MenuContext from 'context/MenuContext'
import React from 'react'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { inputState } from 'store/slices/filterSlice'

import { participantsState } from 'store/slices/participantsSlice'
import { selectState } from 'store/slices/selectSlice'
import Participant from './Participant'

const Participants = (currentEvent) => {
  const searchTerm = useSelector(inputState)
  const participants = useSelector(participantsState)
  const {currentParticipantsPage} = useContext(MenuContext)
  const selected = useSelector(selectState)
  return (
    <>
      {currentParticipantsPage && 
        currentParticipantsPage.filter((participant) => {
          if (selected === 'Visited') {
            if (participant.visitedEvent === true) return participant
          } else return participant
        }).map((participant, id) => (
          <Participant key={id} participant={participant} currentEvent={currentEvent} />
        ))}
    </>
  )
}

export default Participants
