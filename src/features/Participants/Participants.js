import React from 'react'
import { useSelector } from 'react-redux'
import { inputState } from 'store/slices/filterSlice'

import Participant from './Participant'

const Participants = (currentEvent) => {
  const searchTerm = useSelector((state) => state.searchTerm.searchTerm)
  const participants = useSelector((state) => state.participants.participants)
  const selected = useSelector((state) => state.value.value)
  const members = useSelector((state) => state.members.members)
    
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
