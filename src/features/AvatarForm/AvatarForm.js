import React, { useState, useEffect, useRef } from 'react'

import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'

import { membersCollection, storage, auth } from 'firebase-client'
import { memberUpState } from '../../store/slices/memberUpSlice'
import { useSelector } from 'react-redux'
import { memberState } from '../../store/slices/memberSlice'

import style from 'assets/scss/profile.module.scss'

const AvatarForm = () => {
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [photoURL, setPhotoURL] = useState(
    'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
  )
  const member = useSelector(memberState)
  const id = member.id

  const NONE = { display: 'none' }

  // info about user
  function useAuth() {
    const [currentUser, setCurrentUser] = useState()
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user))
      return unsub
    }, [])
    return currentUser
  }

  const currentUser = useAuth()
  const updatedMember = useSelector(memberUpState)

  //storage
  async function upload(file, id, setLoading) {
    const fileRef = ref(storage, member.id)
    const docRef = doc(membersCollection, member.id)

    setLoading(true)
    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)
    await updateProfile(currentUser, {
      photoURL: photoURL,
    })

    await updateDoc(docRef, {
      userPhoto: photoURL,
    })

    setLoading(false)
    alert('Uploaded file!')
  }

  function handleChange(e) {
    if (e.target.files[0]) setPhoto(e.target.files[0])
  }

  function handleClick() {
    upload(photo, member.id, setLoading)
  }

  useEffect(() => {
    if (member?.userPhoto) {
      setPhotoURL(member.userPhoto)
    }
  }, [member.userPhoto])

  return (
    <>
      <img src={photoURL} alt="Profile Avatar" className={`mb-4 mt-2 ${style.avatar} `} />

      <input
        type="file"
        style={{ display: 'none' }}
        className="form-control"
        id="selectFile"
        aria-describedby="inputGroupFileAddon04"
        aria-label="Upload"
        onChange={handleChange}
      />

      <button
        className="btn btn-outline-primary"
        type="button"
        id="inputGroupFileAddon04"
        style={{ display: photo ? 'none' : 'block' }}
        onClick={() => document.getElementById('selectFile').click()}
      >
        Change photo
      </button>

      <button
        className="btn btn-primary"
        type="button"
        id="inputGroupFileAddon04"
        onClick={handleClick}
        style={{ display: !photo ? 'none' : 'block', marginTop: '10px' }}
      >
        Confirm
      </button>
    </>
  )
}
export default AvatarForm
