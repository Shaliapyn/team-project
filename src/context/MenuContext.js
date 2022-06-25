import React, { createContext, useState } from 'react'

import { useSelector } from 'react-redux'
import { eventsState } from 'store/slices/eventsSlice'
import { membersState } from 'store/slices/membersSlice'
import { participantsState } from 'store/slices/participantsSlice'
import { visitedEventsState } from 'store/slices/visitedEventsSlice'

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [isMenuCheked, setIsMenuChecked] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showDeleteForm, setShowDeleteForm] = useState(false)

  const members = useSelector(membersState)
  const events = useSelector(eventsState)
  const visitedEvents = useSelector(visitedEventsState)
  const participants = useSelector(participantsState)

  const [currentPage, setCurrenPage] = useState(1)
  const [inputValue, setInputValue] = useState(8)
  const [dataPerPage, setDataPerPage] = useState(inputValue)
  const [elementsPassed, setElementsPassed] = useState(null)

  const [pageNumberLimit, setPageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  const indexOfLastData = currentPage * dataPerPage
  const indexOfFirstData = indexOfLastData - dataPerPage

  const currentMembersPage = members && members.slice(indexOfFirstData, indexOfLastData)
  const managers =
    members &&
    members.filter((member) => {
      return member.role !== 'admin'
    })
  const currentManagersPage = managers && managers.slice(indexOfFirstData, indexOfLastData)
  const currentEventsPage = events && events.slice(indexOfFirstData, indexOfLastData)
  const currentVisitedEventsPage = visitedEvents && visitedEvents.slice(indexOfFirstData, indexOfLastData)
  const currentParticipantsPage = participants && participants.slice(indexOfFirstData, indexOfLastData)

  const paginate = (num) => {
    setCurrenPage(num)
    setElementsPassed(currentMembersPage.length)
  }

  const nextPage = (e) => {
    e.preventDefault()
    console.log(managers)
    setCurrenPage((prev) => prev + 1)
    if (window.location.pathname === '/auth/event-list') {
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        if (currentVisitedEventsPage.length !== 0) return setCurrenPage(currentPage)
      }
    } else if (window.location.pathname === '/auth/event-management') {
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        if (currentEventsPage.length !== 0) return setCurrenPage(currentPage)
      }
    } else if (window.location.pathname === '/auth/event-management/event') {
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
    } else if (window.location.pathname === '/auth/member-management') {
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
        elementsPassed,
        currentParticipantsPage,
        setInputValue,
        inputValue,
        setDataPerPage,
        events,
        visitedEvents,
        members,
        managers,
        participants,
        paginate,
        currentPage,
        setCurrenPage,
        dataPerPage,
        currentMembersPage,
        currentManagersPage,
        currentEventsPage,
        currentVisitedEventsPage,
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
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export default MenuContext
