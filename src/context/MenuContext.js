import React, { createContext, useState } from 'react'

import { useSelector } from 'react-redux'
import { eventsState } from 'store/slices/eventsSlice'
import { membersState } from 'store/slices/membersSlice'
import { visitedEventsState } from 'store/slices/visitedEventsSlice'

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [isMenuCheked, setIsMenuChecked] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showDeleteForm, setShowDeleteForm] = useState(false)

  const members = useSelector(membersState)
  const events = useSelector(eventsState)
  const visitedEvents = useSelector(visitedEventsState)
  const [currentPage, setCurrenPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(4)

  const indexOfLastData = currentPage * dataPerPage
  const indexOfFirstData = indexOfLastData - dataPerPage

  const currentMembersPage = members && members.slice(indexOfFirstData, indexOfLastData)
  const currentEventsPage = events && events.slice(indexOfFirstData, indexOfLastData)
  const currentVisitedEventsPage = visitedEvents && visitedEvents.slice(indexOfFirstData, indexOfLastData)

  const paginate = (pageNumber) => setCurrenPage(pageNumber)
  const nextPage = (e) => {
    e.preventDefault()
    setCurrenPage((prev) => prev + 1)
    if (window.location.pathname === '/auth/member-management') {
      if (currentPage >= currentMembersPage.length) return setCurrenPage((prev) => prev - 1)
    } else if (window.location.pathname === '/auth/event-list') {
      if (currentPage >= currentVisitedEventsPage.length) return setCurrenPage((prev) => prev - 1)
    } else if (window.location.pathname === '/auth/event-management') {
      if (currentPage >= currentEventsPage.length) return setCurrenPage((prev) => prev - 1)
    }
  }

  const prevPage = (e) => {
    e.preventDefault()
    setCurrenPage((prev) => prev - 1)
    if (currentPage <= 1) return setCurrenPage((prev) => prev + 1)
  }

  const handleEdit = () => {
    setShowUpdateForm(!showUpdateForm)
  }
  return (
    <MenuContext.Provider
      value={{
        paginate,
        setCurrenPage,
        dataPerPage,
        currentMembersPage,
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
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export default MenuContext
