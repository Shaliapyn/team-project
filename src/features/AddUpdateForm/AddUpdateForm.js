import React, { useContext, useEffect, useRef, useState } from 'react'

import { updateDoc, doc } from 'firebase/firestore'
import { membersCollection } from '../../firebase-client'

import styles from '../../assets/scss/updateMemberData.module.scss'

import CloseButton from '../../ui/button/CloseButton'
import Input from '../../ui/input/Input'
import { useSelector } from 'react-redux'
import { memberUpState } from '../../store/slices/memberUpSlice'

import MenuContext from 'context/MenuContext'

const AddUpdateForm = ({ closeForm }) => {
  const regex = /^[\d\(\)\+\-\s]*$/gi
  const updatedMember = useSelector(memberUpState)
  
  const [email, setEmail] = useState(updatedMember.email)
  const [firstName, setFirstName] = useState(updatedMember.firstName)
  const [lastName, setLastName] = useState(updatedMember.lastName)
  const [birthDate, setBirthDate] = useState(updatedMember.birthDate)
  const [phone, setPhone] = useState(updatedMember.phone)
  const [organisation, setOrganisation] = useState(updatedMember.organisation)
  const [initialScore, setInitialScore] = useState(updatedMember.initialScore)
  const [showError, setShowError] = useState(false)
  const [message, setMessage] = useState(false)

  const updateMember = async (e) => {
    e.preventDefault()

    const updatedDoc = doc(membersCollection, updatedMember.id)
    const newFields = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      phone: phone,
      organisation: organisation,
      initialScore: parseInt(initialScore),
      score: updatedMember.score - updatedMember.initialScore + parseInt(initialScore),
    }
    await updateDoc(updatedDoc, newFields)
    setMessage(true)
  }

  const handlerTel = (e) => {
    let tel = e.target.value
    
    if (tel.match(regex)) {
      setPhone(tel)
      setShowError(false)
    } else {
      setShowError(true)
    }
  }
  
  const { showUpdateForm, setShowUpdateForm } = useContext(MenuContext)
  const ref = useRef()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the modal
      if (showUpdateForm && ref.current && !ref.current.contains(e.target)) {
        setShowUpdateForm(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showUpdateForm])

  return (
    <>
    {!message && (
    <div className={styles.background}>
      <div style={{ overflow: 'hidden' }}>
        <form className={styles.plate} onSubmit={updateMember} name="createUser" ref={ref} action="">
          <CloseButton onClick={closeForm} />
          <div className={styles.borders}>

            <h1 className={`${styles.title} text-light`}>Update Member Data</h1>
            <div className={styles.element}>
              <label htmlFor="firstName">First Name</label>
              <Input
                id="firstName"
                type={'text'}
                placeholder={'First name'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <label htmlFor="firstName">Last Name</label>
              <Input
                id="lastName"
                type={'text'}
                placeholder={'Last name'}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type={'email'}
                placeholder={'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <label htmlFor="birthDate">Birth Date</label>
              <Input
                id="birthDate"
                type={'date'}
                placeholder={'birth date'}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <label htmlFor="phone">Phone</label>
              <Input
                id="phone"
                type={'tel'}
                placeholder={'Phone number'}
                value={phone}
                onChange={handlerTel}
              />
            </div>
            <div className={styles.element}>
              <label htmlFor="organisation">Organisation</label>
              <Input
                id="organisation"
                type={'text'}
                placeholder={'Organisation'}
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <label htmlFor="score">Initial Score</label>
              <Input
                id="score"
                type={'number'}
                placeholder={'Initial score'}
                value={initialScore}
                onChange={(e) => setInitialScore(e.target.value)}
              />
            </div>
            <div className={styles.element}>
              <button
                type="submit"
                style={{ fontSize: '16px' }}
                className={`btn btn-primary rounded-pill ${styles.button}`}
              >

                Submit changes
              </button>
            </div>
            {showError && (
              <div className={styles.element}>
                <p className="fs-5 text-danger">Enter correct phone number</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
    )}
    {message && (
      <div className={styles.background}>
        <form className={styles.plateNotify}>
          <div className={styles.borders}>
            <p className="mt-4 fs-4 lh-base text-primary">This member has been updated successfully!</p>
            <button type="button" className={`btn btn-outline-primary rounded-pill mb-4 ${styles.buttonOk}`} onClick={closeForm}>
              OK
            </button>
          </div>
        </form>
      </div>
    )}
  </>
  )
}

export default AddUpdateForm
