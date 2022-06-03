import React, { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';

import { collection , query, onSnapshot, where} from 'firebase/firestore';
import {onAuthStateChanged} from 'firebase/auth'
import {db} from '../../firebase-client';
import { auth } from "../../firebase-client"
import { setPersistence, browserLocalPersistence } from "firebase/auth";

import {setMember} from '../../store/slices/memberSlice';

const GetState = ({children}) => {
        
    const dispatch = useDispatch();
    const user = auth.currentUser;
    const [currentUser, setCurrentUser] = useState(user);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setCurrentUser(user)
        })
    }, [])
    
    const email = currentUser ? currentUser.email : null;
    
    const q = query(collection(db, "members"), where("email", "==", email));
     
    useEffect(() => {
        onSnapshot(q,(snapshot)=>{
            snapshot.forEach((doc) => {
                dispatch(setMember({
                  id: doc.id,
                  ...doc.data(),
                }));
              });
    })
    },[q]);

    return children;
}

export default GetState