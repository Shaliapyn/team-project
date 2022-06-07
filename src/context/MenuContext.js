import { doc } from 'firebase/firestore'
import React, { createContext, useState } from 'react'
import { membersCollection } from '../firebase-client'

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [isMenuCheked, setIsMenuChecked] = useState(false)

  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const handleEdit = () => {
    setShowUpdateForm(!showUpdateForm)
  }

  return <MenuContext.Provider value={{handleEdit, isMenuCheked, setIsMenuChecked, showUpdateForm, setShowUpdateForm }}>{children}</MenuContext.Provider>
}

export default MenuContext
