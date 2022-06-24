import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { collection, orderBy, query, onSnapshot, where } from 'firebase/firestore'
import { onIdTokenChanged } from 'firebase/auth'
import { db, auth, eventsCollection, membersCollection } from 'firebase-client'

import { setMember } from 'store/slices/memberSlice'
import { setEvents } from 'store/slices/eventsSlice'
import { setMembers } from 'store/slices/membersSlice'
import { useLocation } from 'react-router-dom'
import { setInput } from 'store/slices/filterSlice'
import MenuContext from 'context/MenuContext'

const GetState = ({ children }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const {setDataPerPage, inputValue} = useContext(MenuContext)
  
  useEffect(() => {
    dispatch(setInput(""))
    setDataPerPage(inputValue)
  },[location])
  
  useEffect(() => {
    onIdTokenChanged(auth, (user) => {
      if (!user) {
        console.log('No User found...')
      } else {
        const token = user.getIdToken().then(() => {
          const q = query(collection(db, 'members'), where('email', '==', user.email))
          onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
              dispatch(
                setMember({
                  id: doc.id,
                  ...doc.data(),
                })
              )
            })
          })
        })
      }
    })
  }, [])

  const qEvents = query(eventsCollection, orderBy('eventDate', 'desc'))

  useEffect(() => {
    onSnapshot(qEvents, (snapshot) => {
      const eventsSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      dispatch(setEvents(eventsSnap))
    })
  }, [])

  useEffect(() => {
    onSnapshot(membersCollection, (snapshot) => {
      const memberSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      dispatch(setMembers(memberSnap))
    })
  }, [])

  return children
}

export default GetState
