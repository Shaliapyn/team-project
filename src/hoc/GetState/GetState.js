import React, { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';

import { collection ,orderBy, query, onSnapshot, where} from 'firebase/firestore';
import {onAuthStateChanged, onIdTokenChanged} from 'firebase/auth'
import {db} from '../../firebase-client';
import { auth } from "../../firebase-client"
import { eventsCollection,  } from '../../firebase-client';

import { setMember } from '../../store/slices/memberSlice';
import { setEvents } from '../../store/slices/eventsSlice';

const GetState = ({children}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onIdTokenChanged(auth, (user) => {
      if (!user) {
        console.log('No User found...')
      
      } else {
        
        const token = user.getIdToken()
          .then(() => {
            const q = query(collection(db, "members"), where("email", "==", user.email));

                  onSnapshot(q,(snapshot)=>{
                    snapshot.forEach((doc) => {
                        dispatch(setMember({
                          id: doc.id,
                          ...doc.data(),
                        }));
                      });
            })
          }) 
    }})
  }, [])

  const qEvents = query(eventsCollection, orderBy('eventDate', 'desc')); 

  useEffect(() => {
    onSnapshot(qEvents, (snapshot) => {
      const eventsSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(
        setEvents(eventsSnap)
      );
    })
  }, [qEvents])
  
        
  // const dispatch = useDispatch();
  // const user = auth.currentUser;
  // const [currentUser, setCurrentUser] = useState(user);
    
  // useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       setCurrentUser(user)
  //     })
  // }, [])
    
  // const email = currentUser ? currentUser.email : null;
  
  // const q = query(collection(db, "members"), where("email", "==", email));
    
  // useEffect(() => {
  //     onSnapshot(q,(snapshot)=>{
  //         snapshot.forEach((doc) => {
  //             dispatch(setMember({
  //               id: doc.id,
  //               ...doc.data(),
  //             }));
  //           });
  // })
  // },[q]);

  return children;
}

export default GetState