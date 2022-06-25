import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { membersState } from 'store/slices/membersSlice'
import { inputState } from 'store/slices/filterSlice'
import { selectState } from 'store/slices/selectSlice'
import Member from './Member/Member'
import { useContext } from 'react'
import MenuContext from 'context/MenuContext'

const Members = () => {
  const members = useSelector(membersState)
  const searchTerm = useSelector(inputState)
  const selected = useSelector(selectState)
  const { currentMembersPage } = useContext(MenuContext)

  return (
    <>
      {searchTerm
        ? members &&
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
            .map((member, id) => <Member key={id} member={member} />)
        : currentMembersPage &&
          currentMembersPage
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
