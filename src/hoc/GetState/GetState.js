import React, { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';

import { collection , query, onSnapshot, where} from 'firebase/firestore';
import {onAuthStateChanged, onIdTokenChanged} from 'firebase/auth'
import {db} from '../../firebase-client';
import { auth } from "../../firebase-client"

import {setMember} from '../../store/slices/memberSlice';

const GetState = ({children}) => {

  // return firebaseClient.auth().onIdTokenChanged(async (user) => {
  //    if (!user) {
  //           console.log('No User found...')
  //           return
  //         } else {
  //           console.log('Updating user...')
  //           const token = await user.getIdToken()
  //           console.log(token);
  //           console.log(user);
  //   }
  //   })

  const dispatch = useDispatch();

  useEffect(() => {
    onIdTokenChanged(auth, (user) => {
      if (!user) {
        console.log('No User found...')
      
      } else {
        
        // console.log('Updating user...')
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

        console.log(token);
        // console.log(user);
    }})
  }, [])
  
        
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