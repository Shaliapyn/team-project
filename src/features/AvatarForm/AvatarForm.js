import React, { useState, useEffect, useRef } from 'react'

import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth } from 'firebase-client'
import style from 'assets/scss/profile.module.scss'

import { storage } from 'firebase-client'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const AvatarForm = () => {
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [photoURL, setPhotoURL] = useState(
    'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
  )
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

  //storage
  async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid)

    setLoading(true)
    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)
    updateProfile(currentUser, {
      photoURL: photoURL,
    })
    setLoading(false)
    alert('Uploaded file!')
  }

  function handleChange(e) {
    if (e.target.files[0]) setPhoto(e.target.files[0])
  }

  function handleClick() {
    upload(photo, currentUser, setLoading)
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL)
    }
  }, [currentUser])

  return (
    <>
      <img src={photoURL} alt="Profile Avatar" className={`mb-3 ${style.avatar} `} />

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
