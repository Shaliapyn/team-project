import React, { createContext, useState } from 'react'

import { useSelector } from 'react-redux'
import { eventsState } from 'store/slices/eventsSlice'
import { filteredMembersState } from 'store/slices/filteredMembersSlice'
import { membersState } from 'store/slices/membersSlice'
import { participantsState } from 'store/slices/participantsSlice'
import { visitedEventsState } from 'store/slices/visitedEventsSlice'

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [isMenuCheked, setIsMenuChecked] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showDeleteForm, setShowDeleteForm] = useState(false)

  const members = useSelector(membersState)
  const filteredMembers = useSelector(filteredMembersState)
  const events = useSelector(eventsState)
  const visitedEvents = useSelector(visitedEventsState)
  const participants = useSelector(participantsState)

  const [currentPage, setCurrenPage] = useState(1)
  const [inputValue, setInputValue] = useState(8)
  const [dataPerPage, setDataPerPage] = useState(inputValue)
  const [elementsPassed, setElementsPassed] = useState(0)

  const [pageNumberLimit, setPageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  const indexOfLastData = currentPage * dataPerPage
  const indexOfFirstData = indexOfLastData - dataPerPage

  const currentMembersPage = filteredMembers && filteredMembers.slice(indexOfFirstData, indexOfLastData)
  const managers =
  filteredMembers &&
  filteredMembers.filter((member) => {
      return member.role !== 'admin'
    })
  const currentManagersPage = managers && managers.slice(indexOfFirstData, indexOfLastData)

  const currentParticipantsPage = filteredMembers && filteredMembers.slice(indexOfFirstData, indexOfLastData)

  const paginate = (num) => {
    setCurrenPage(num)
  }

  const nextPage = (e) => {
    e.preventDefault()
    setCurrenPage((prev) => prev + 1)
  if (window.location.pathname === '/auth/event-management/event') {
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        if (currentParticipantsPage.length !== 0) return setCurrenPage(currentPage)
      }
    } else if (window.location.pathname === '/auth/manager-management') {
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        if (currentManagersPage.length !== 0) return setCurrenPage(currentPage)
      }
    } else {
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        if (currentMembersPage.length !== 0) return setCurrenPage(currentPage)
      }
    }
  }

  const prevPage = (e) => {
    e.preventDefault()
    setCurrenPage((prev) => prev - 1)

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  const handleEdit = () => {
    setShowUpdateForm(!showUpdateForm)
  }
  
  return (
    <MenuContext.Provider
      value={{
        filteredMembers,
        elementsPassed,
        setElementsPassed,
        currentParticipantsPage,
        setInputValue,
        inputValue,
        setDataPerPage,
        events,
        visitedEvents,
        members,
        participants,
        paginate,
        currentPage,
        setCurrenPage,
        dataPerPage,
        currentMembersPage,
        currentManagersPage,
        nextPage,
        prevPage,
        showDeleteForm,
        setShowDeleteForm,
        handleEdit,
        isMenuCheked,
        setIsMenuChecked,
        showUpdateForm,
        setShowUpdateForm,
        maxPageNumberLimit,
        minPageNumberLimit,
        managers
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export default MenuContext
