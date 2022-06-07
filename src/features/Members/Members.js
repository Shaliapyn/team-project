import React from 'react'
import { useSelector } from 'react-redux'

import { memberState } from '../../store/slices/membersSlice'
import Member from './Member/Member'


const Members = () => {
  const members = useSelector(memberState)

  return (
    <>
      {members && members.map((member, id) => (
        <Member key={id} member={member}/>
      ))}
    </>
  )
}

export default Members
