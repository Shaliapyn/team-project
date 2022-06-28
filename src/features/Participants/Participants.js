import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inputState } from 'store/slices/filterSlice'

import { participantsState } from 'store/slices/participantsSlice'
import { membersState } from 'store/slices/membersSlice'
import { selectState } from 'store/slices/selectSlice'
import Participant from './Participant'

const Participants = (currentEvent) => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(inputState)
  const participants = useSelector(participantsState)
  const selected = useSelector(selectState)
  const members = useSelector(membersState)
    
  return (
    <>
      {members &&
      members
        .filter((member) => {
          if (searchTerm === '') return member
          else if (
            member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return member
          }
        })
        .filter((member) => {
          const foundEl = participants.find((el) => el.id === member.id)
          if (selected === 'Visited') {
            if (foundEl.visitedEvent) {
              return member
            }} 
          if (selected === 'NotVisited') {
            if (!foundEl.visitedEvent) {
              return member 
            }}
          if (selected === 'All') return member 
        })
        .map((member, id) => (
          <Participant key={id} participant={participants.find((el) => el.id === member.id)} currentEvent={currentEvent} />
        ))  
      }
    </>
    )
}

export default Participants
