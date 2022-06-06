import React, {useState} from "react";

import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import {collection, addDoc} from "firebase/firestore";
import {db} from '../../firebase-client';

import style from '../../assets/scss/AddMemberForm.module.scss'

import CloseButton from "../../ui/button/CloseButton";
import Input from "../../ui/input/Input";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const AddMemberForm = ({closeForm}) => {
       
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [initialScore, setInitialScore] = useState('');

  const createMember = (e) => {
    e.preventDefault();
    setError('');

    let secondaryApp = initializeApp(firebaseConfig, "secondary");
    const secondaryAuth = getAuth(secondaryApp);
            
    createUserWithEmailAndPassword(secondaryAuth, email, password)
      .then(signOut(secondaryAuth))
      .then(() => {secondaryApp = null})
      .then(() => {
        addDoc(collection(db, "members"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          organisation: organisation,
          birthDate: birthDate,
          score: initialScore,
          role: 'user',
        });
      })
      .catch(err => {
        setError(err.message);
        console.error(error);
      });
    
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setOrganisation('');
    setBirthDate('');
    setInitialScore('');
  }
  
  return (
    <div className={style.background}>
      <div style={{ overflow: 'hidden' }}>
        <form className={style.plate} onSubmit={createMember} name='createUser'>
          <CloseButton onClick={closeForm}/>
          <div className={style.borders}>
            <h1 className={style.title}>Add Member Form</h1>
            <div className={style.element}>
              <Input 
                type={"text"} 
                placeholder={"First name"}
                value={firstName}
                onChange={e => setFirstName(e.target.value)} 
              />
            </div>
            <div className={style.element}>
              <Input 
                type={"text"} 
                placeholder={"Last name"}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input 
                type={"email"} 
                placeholder={"Email"} 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input 
                type={"password"} 
                placeholder={"Password"} 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className={style.element}>
              <Input 
                type={"date"} 
                placeholder={"birth date"} 
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}  
              />
            </div>
            <div className={style.element}>
              <Input 
                type={"tel"} 
                placeholder={"Phone number"} 
                value={phone}
                onChange={e => setPhone(e.target.value)}  
              />
            </div>
            <div className={style.element}>
              <Input 
                type={"text"} 
                placeholder={"Organisation"} 
                value={organisation}
                onChange={e => setOrganisation(e.target.value)}  
              />
            </div>
            <div className={style.element}>
              <Input 
                type={"number"} 
                placeholder={"Initial score"} 
                value={initialScore}
                onChange={e => setInitialScore(e.target.value)}  
              />
            </div>
            <div className={style.element}>
              <button 
                type="submit" 
                style={{fontSize: "18px", height: '50px'}} 
                className="btn btn-primary rounded-pill w-100"
              >
                Add new Member
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMemberForm