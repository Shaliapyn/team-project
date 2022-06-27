import React from 'react'
import { useSelector } from 'react-redux'
import { inputState } from 'store/slices/filterSlice'

import { membersState } from 'store/slices/membersSlice'
import { selectState } from 'store/slices/selectSlice'
import Member from './Member/Member'

const Members = () => {
  const members = useSelector(membersState)
  const searchTerm = useSelector(inputState)
  const selected = useSelector(selectState)
  return (
    <>
      {members &&
        members
          .filter((member) => {
            if (searchTerm === '') return member
            else if (
              member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              member.email.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return member
            }
          })
          .filter((member) => {
            if (selected === 'Managers') {
              if (member.role === 'manager') return member
            } else if (selected === 'Users') {
              if (member.role === 'user') return member
            } else return member
          })
          .map((member, id) => {
            return <Member key={id} member={member} />
          })}
    </>
  )
}

export default Members
