import React, { useContext, useState } from 'react'

import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import { membersCollection } from '../../firebase-client'

import style from '../../assets/scss/AddMemberForm.module.scss'

import CloseButton from '../../ui/button/CloseButton'
import Input from '../../ui/input/Input'
import { useSelector } from 'react-redux'
import { memberUpState } from '../../store/slices/memberUpSlice'
import MenuContext from '../../context/MenuContext'

const AddUpdateForm = ({ closeForm }) => {
  const updatedMember = useSelector(memberUpState)
  const {handleEdit} = useContext(MenuContext)

  const [email, setEmail] = useState(updatedMember.email)
  const [firstName, setFirstName] = useState(updatedMember.firstName)
  const [lastName, setLastName] = useState(updatedMember.lastName)
  const [birthDate, setBirthDate] = useState(updatedMember.birthDate)
  const [phone, setPhone] = useState(updatedMember.phone)
  const [organisation, setOrganisation] = useState(updatedMember.organisation)
  const [initialScore, setInitialScore] = useState(updatedMember.initialScore)

  const updateMember = async (e) => {
    e.preventDefault()

    // addDoc(collection(db, "members"), {
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email,
    //   phone: phone,
    //   organisation: organisation,
    //   birthDate: birthDate,
    //   score: initialScore,
    //   role: 'user'
    // });
    const updatedDoc = doc(membersCollection, updatedMember.id)
    const newFields = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      phone: phone,
      organisation: organisation,
      initialScore: initialScore,
    }
    await updateDoc(updatedDoc, newFields)
    handleEdit()
  }

  return (
    <div className={style.background}>
      <div style={{ overflow: 'hidden' }}>
        <form className={style.plate} onSubmit={updateMember} name="createUser">
          <CloseButton onClick={closeForm} />
          <div className={style.borders}>
            <h1 className={style.title}>Add Member Form</h1>
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
            <div className={style.element}>
              <button type="submit" style={{ fontSize: '16px' }} className="btn btn-primary rounded-pill w-auto">
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
