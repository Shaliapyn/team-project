import React from 'react'
import { useSelector } from 'react-redux'
import { memberState } from '../../store/slices/membersSlice'
import Manager from './Manager/Manager'


const Managers = () => {
  const members = useSelector(memberState)
  return (
    <>
      {members.map((member, id) => {
        if (member.role !== "user"){
          return <Manager manager={member} id={id}/>
        }
      })}
    </>
  )
}

export default Managers
