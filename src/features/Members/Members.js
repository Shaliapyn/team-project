import React from 'react'
import { useSelector } from 'react-redux'

import { memberState } from 'store/slices/membersSlice'
import { inputState } from 'store/slices/filterSlice'
import { selectState } from 'store/slices/selectSlice'
import Member from './Member/Member'


const Members = () => {
  const members = useSelector(memberState)
  const searchTerm = useSelector(inputState)
  const selected = useSelector(selectState)
  return (
    <>
      {members
        .filter((member) => {
          if (selected === 'Managers') {
            if (member.role === 'manager') return member
          } else if (selected === 'Users') {
            if (member.role === 'user') return member
          } else return member
        })
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
        .map((member, id) => (
          <Member key={id} member={member} />
        ))}
    </>
  )
}

export default Members
