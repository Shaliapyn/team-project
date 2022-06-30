import React, { useState, useEffect, useRef, useContext } from 'react'
import { useSelector } from 'react-redux'

import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db } from 'firebase-client'

import styles from 'assets/scss/AddMemberForm.module.scss'

import { eventsState } from 'store/slices/eventsSlice'
import CloseButton from 'ui/button/CloseButton'
import Input from 'ui/input/Input'
import MenuContext from 'context/MenuContext'

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
  const regex = /^[\d\(\)\+\-\s]*$/gi
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [phone, setPhone] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [initialScore, setInitialScore] = useState('')
  const [showError1, setShowError1] = useState(false)
  const [showError2, setShowError2] = useState(false)
  const [message, setMessage] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
  )

  const events = useSelector(eventsState)

  const createMember = (e) => {
    e.preventDefault()
    setError('')

    if (password.trim().length >= 6) {

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
        .then(() => {
          setMessage(true)
        })
        .catch((err) => {
          setError(err.message)
          console.error(error)
        })
    } else {
      setShowError2(true)
      setPassword('')
    }
  }

  const handlerTel = (e) => {
    let tel = e.target.value
    
    if (tel.match(regex)) {
      setPhone(tel)
      setShowError1(false)
    } else {
      setShowError1(true)
    }
  }
  

  const { showAddForm, setShowAddForm } = useContext(MenuContext)
  const ref = useRef()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the modal
      if (showAddForm && ref.current && !ref.current.contains(e.target)) {
        setShowAddForm(false)
      }
      console.log(showAddForm, ref.current, !ref.current.contains(e.target))
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showAddForm])

  return (
    <>
    {!message && (
    <div className={styles.background}>
      <div className={styles.formParent} style={{ overflow: 'hidden' }}>
        <form className={styles.plate} onSubmit={createMember} name="createUser">
          <CloseButton onClick={closeForm} />
          <div className={styles.borders}>
            <h1 className={`${styles.title} text-light`}>Add Member Form</h1>
            <div className={styles.element}>
              <Input
                id="firstName"
                type={'text'}
                placeholder={'First name'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <Input
                id="lastName"
                type={'text'}
                placeholder={'Last name'}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className={styles.element}>
              <Input
                id="email"
                type={'email'}
                placeholder={'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.element}>
              <Input
                type={'password'}
                placeholder={'Password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setShowError2(false)
                }}
              />
            </div>
            <div className={styles.element}>
              <Input
                id="birthDate"
                type={'date'}
                placeholder={'birth date'}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <Input
                type={'tel'}
                placeholder={'Phone number'}
                value={phone}
                onChange={handlerTel}
              />
            </div>
            <div className={styles.element}>
              <Input
                type={'text'}
                placeholder={'Organisation'}
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <Input
                type={'number'}
                placeholder={'Initial score'}
                value={initialScore}
                onChange={(e) => setInitialScore(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <button
                type="submit"
                style={{ fontSize: '18px', height: '50px' }}

                className={`btn btn-primary rounded-pill ${style.button}`}

              >
                Add Member
              </button>
            </div>
            {showError1 && (
              <div className={styles.element}>
                <p className="fs-5 text-danger">Enter correct phone number</p>
              </div>
            )}
            {showError2 && (
              <div className={styles.element}>
                <p className="fs-5 text-danger lh-base">
                  Enter correct new password (six or more characters)
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
    )}
    {message && (
      <div className={styles.background}>
        <form className={styles.plate}>
          <div className={styles.borders}>
            <p className="mt-4 fs-4 lh-base text-primary">A new member has been added successfully!</p>
            <button type="button" className="btn btn-outline-primary rounded-pill w-auto mb-4" onClick={closeForm}>
              OK
            </button>
          </div>
        </form>
      </div>
    )}
  </>
  )
}

export default AddMemberForm
