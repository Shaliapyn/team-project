import React, { useContext, useEffect, useRef, useState } from 'react'

import { updateDoc, doc } from 'firebase/firestore'
import { membersCollection } from '../../firebase-client'

import style from '../../assets/scss/updateMemberData.module.scss'

import CloseButton from '../../ui/button/CloseButton'
import Input from '../../ui/input/Input'
import { useSelector } from 'react-redux'
import { memberUpState } from '../../store/slices/memberUpSlice'

import MenuContext from 'context/MenuContext'

const AddUpdateForm = ({ closeForm }) => {
  const updatedMember = useSelector(memberUpState)
  const { handleEdit } = useContext(MenuContext)

  const [email, setEmail] = useState(updatedMember.email)
  const [firstName, setFirstName] = useState(updatedMember.firstName)
  const [lastName, setLastName] = useState(updatedMember.lastName)
  const [birthDate, setBirthDate] = useState(updatedMember.birthDate)
  const [phone, setPhone] = useState(updatedMember.phone)
  const [organisation, setOrganisation] = useState(updatedMember.organisation)
  const [initialScore, setInitialScore] = useState(updatedMember.initialScore)

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
    handleEdit()
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
    <div className={style.background}>
      <div style={{ overflow: 'hidden' }}>
        <form className={style.plate} onSubmit={updateMember} name="createUser" ref={ref} action="">
          <CloseButton onClick={closeForm} />
          <div className={style.borders}>

            <h1 className={`${style.title} text-light`}>Update Member Data</h1>
            <div className={style.element}>
              <label htmlFor="firstName">First Name</label>
              <Input
                id="firstName"
                type={'text'}
                placeholder={'First name'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className={style.element}>
              <label htmlFor="firstName">Last Name</label>
              <Input
                id="lastName"
                type={'text'}
                placeholder={'Last name'}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className={style.element}>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type={'email'}
                placeholder={'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <label htmlFor="birthDate">Birth Date</label>
              <Input
                id="birthDate"
                type={'date'}
                placeholder={'birth date'}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <label htmlFor="phone">Phone</label>
              <Input
                id="phone"
                type={'tel'}
                placeholder={'Phone number'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <label htmlFor="organisation">Organisation</label>
              <Input
                id="organisation"
                type={'text'}
                placeholder={'Organisation'}
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <label htmlFor="score">Initial Score</label>
              <Input
                id="score"
                type={'number'}
                placeholder={'Initial score'}
                value={initialScore}
                onChange={(e) => setInitialScore(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <button
                type="submit"
                style={{ fontSize: '16px' }}
                className={`btn btn-primary rounded-pill ${style.button}`}
              >

                Submit changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUpdateForm
