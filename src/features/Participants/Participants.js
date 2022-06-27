import MenuContext from 'context/MenuContext'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filteredMembersState, setFilteredMembers } from 'store/slices/filteredMembersSlice'
import { inputState } from 'store/slices/filterSlice'

import { participantsState } from 'store/slices/participantsSlice'
import { selectState } from 'store/slices/selectSlice'
import Participant from './Participant'

const Participants = (currentEvent) => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(inputState)
  const participants = useSelector(participantsState)
  const { currentMembersPage } = useContext(MenuContext)
  const selected = useSelector(selectState)
  const filtered = useSelector(filteredMembersState)

  useEffect(() => {
    dispatch(
      setFilteredMembers(
        participants.filter((participant) => {
          if (selected === 'Visited') {
            if (participant.visitedEvent === true) return participant
          } else if (selected === 'NotVisited') {
            if (participant.visitedEvent === false) return participant
          } else return participant
        })
      )
    )
  }, [selected, participants])
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
