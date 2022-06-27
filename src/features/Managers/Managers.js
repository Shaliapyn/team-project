import MenuContext from 'context/MenuContext'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filteredMembersState, setFilteredMembers } from 'store/slices/filteredMembersSlice'
import { inputState } from 'store/slices/filterSlice'
import { membersState } from 'store/slices/membersSlice'
import { selectState } from 'store/slices/selectSlice'
import Manager from './Manager/Manager'

const Managers = () => {
  const dispatch = useDispatch()
  const members = useSelector(membersState)
  const selected = useSelector(selectState)
  const searchTerm = useSelector(inputState)
  const { currentManagersPage } = useContext(MenuContext)

  useEffect(() => {
    dispatch(setFilteredMembers(members
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
      })))
  }, [selected, searchTerm, members])

  return (
    <>
            {currentManagersPage && currentManagersPage.map((member, id) => <Manager key={id} member={member} />)}
    </>
  )
}

export default Managers
