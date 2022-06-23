import MenuContext from 'context/MenuContext'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { inputState } from 'store/slices/filterSlice'
import { membersState } from 'store/slices/membersSlice'
import { selectState } from 'store/slices/selectSlice'
import Manager from './Manager/Manager'

const Managers = () => {
  const members = useSelector(membersState)
  const selected = useSelector(selectState)
  const searchTerm = useSelector(inputState)
  const { currentMembersPage } = useContext(MenuContext)
  
  return (
    <>
      {searchTerm
        ? members
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
            .map((member, id) => {
              return <Manager key={id} member={member} />
            })
        : currentMembersPage && currentMembersPage.map((member, id) => <Manager key={id} member={member} />)}
    </>
  )
}

export default Managers
