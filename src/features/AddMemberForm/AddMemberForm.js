import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db } from 'firebase-client'

import style from 'assets/scss/AddMemberForm.module.scss'

import { eventsState } from 'store/slices/eventsSlice'
import CloseButton from 'ui/button/CloseButton'
import Input from 'ui/input/Input'

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: 'AIzaSyApF9590KybCLP-uzuROO_iJfKyN8nIpQA',
  authDomain: 'team-project-4f86d.firebaseapp.com',
  projectId: 'team-project-4f86d',
  storageBucket: 'team-project-4f86d.appspot.com',
  messagingSenderId: '426664838822',
  appId: '1:426664838822:web:484e212ca0c7d3fe729667',
}

const AddMemberForm = ({ closeForm }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [phone, setPhone] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [initialScore, setInitialScore] = useState('')
  const [userPhoto, setUserPhoto] = useState(
    'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
  )

  const events = useSelector(eventsState)

  const createMember = (e) => {
    e.preventDefault()
    setError('')

    let secondaryApp = initializeApp(firebaseConfig, 'secondary')
    const secondaryAuth = getAuth(secondaryApp)

    createUserWithEmailAndPassword(secondaryAuth, email, password)
      .then(signOut(secondaryAuth))
      .then(() => {
        secondaryApp = null
      })
      .then(() => {
        const createdDocRef = addDoc(collection(db, 'members'), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          organisation: organisation,
          birthDate: birthDate,
          initialScore: parseInt(initialScore),
          role: 'user',
          score: parseInt(initialScore),
          userPhoto: userPhoto,
        })

        return createdDocRef
      })
      .then((createdDocRef) => {
        {
          events &&
            events.map(async (event, id) => {
              const docRef = doc(db, 'events', event.id)
              const colRef = collection(docRef, 'participants')

              await setDoc(doc(colRef, createdDocRef.id), {
                addPoints: 0,
                comment: '',
                visitedEvent: false,
              })
            })
        }
      })
      .catch((err) => {
        setError(err.message)
        console.error(error)
      })

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setPhone('')
    setOrganisation('')
    setBirthDate('')
    setInitialScore('')
  }

  return (
    <div className={style.background}>
      <div className={style.formParent} style={{ overflow: 'hidden' }}>
        <form className={style.plate} onSubmit={createMember} name="createUser">
          <CloseButton onClick={closeForm} />
          <div className={style.borders}>
            <h1 className={`${style.title} text-light`}>Add Member Form</h1>
            <div className={style.element}>
              <Input
                type={'text'}
                placeholder={'First name'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input
                type={'text'}
                placeholder={'Last name'}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input type={'email'} placeholder={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={style.element}>
              <Input
                type={'password'}
                placeholder={'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input
                type={'date'}
                placeholder={'birth date'}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input
                type={'tel'}
                placeholder={'Phone number'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input
                type={'text'}
                placeholder={'Organisation'}
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input
                type={'number'}
                placeholder={'Initial score'}
                value={initialScore}
                onChange={(e) => setInitialScore(e.target.value)}
              />
            </div>
            <div className={`${style.element}`}>
              <button
                type="submit"
                style={{ fontSize: '18px', height: '50px' }}
                className="btn btn-primary rounded-pill w-50"
              >
                Add Member
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMemberForm
