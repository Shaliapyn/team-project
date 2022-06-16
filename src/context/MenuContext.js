import React, { createContext, useState } from 'react'

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [isMenuCheked, setIsMenuChecked] = useState(false)

  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showDeleteForm, setShowDeleteForm] = useState(false)

  const handleEdit = () => {
    setShowUpdateForm(!showUpdateForm)
  }

  return <MenuContext.Provider value={{ showDeleteForm, setShowDeleteForm, handleEdit, isMenuCheked, setIsMenuChecked, showUpdateForm, setShowUpdateForm }}>{children}</MenuContext.Provider>
}

export default MenuContext
