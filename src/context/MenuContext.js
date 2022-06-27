import React, { createContext, useState } from 'react'

import { useSelector } from 'react-redux'
import { membersState } from 'store/slices/membersSlice'

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [isMenuCheked, setIsMenuChecked] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showDeleteForm, setShowDeleteForm] = useState(false)

  const members = useSelector(membersState)

  const handleEdit = () => {
    setShowUpdateForm(!showUpdateForm)
  }

  return (
    <MenuContext.Provider
      value={{
        members,
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
