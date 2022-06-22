import React, { createContext, useState } from 'react'

import { useSelector } from 'react-redux'
import { membersState } from 'store/slices/membersSlice'

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [isMenuCheked, setIsMenuChecked] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showDeleteForm, setShowDeleteForm] = useState(false)

  const members = useSelector(membersState)
  const [currentPage, setCurrenPage] = useState(1)
  const [membersPerPage, setMembersPerPage] = useState(4)

  const indexOfLastMember = currentPage * membersPerPage
  const indexOfFirstMember = indexOfLastMember - membersPerPage
  const currentMembersPage = members && members.slice(indexOfFirstMember, indexOfLastMember)

  const paginate = (pageNumber) => setCurrenPage(pageNumber)
  const nextPage = (e) => {
    e.preventDefault()
    setCurrenPage((prev) => prev + 1)
    if (currentPage >= currentMembersPage.length) return setCurrenPage(prev => prev - 1)
  }

  const prevPage = (e) => {
    e.preventDefault()
    setCurrenPage((prev) => prev - 1)
    if (currentPage <= 1) return setCurrenPage(prev => prev + 1)
  }

  const handleEdit = () => {
    setShowUpdateForm(!showUpdateForm)
  }
  return (
    <MenuContext.Provider
      value={{
        paginate,
        setCurrenPage,
        membersPerPage,
        currentMembersPage,
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