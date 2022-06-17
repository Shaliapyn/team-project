import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';

import { collection ,orderBy, query, onSnapshot, where } from 'firebase/firestore';
import { onIdTokenChanged } from 'firebase/auth'
import {db} from '../../firebase-client';
import { auth } from "../../firebase-client"
import { eventsCollection, membersCollection } from '../../firebase-client';

import { setMember } from '../../store/slices/memberSlice';
import { setEvents } from '../../store/slices/eventsSlice';
import { setMembers } from '../../store/slices/membersSlice';

const GetState = ({children}) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const members = useSelector((state) => state.members.members);

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
  }, [qEvents]);

  useEffect(() => {
    onSnapshot(membersCollection, (snapshot) => {
      const memberSnap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(
        setMembers(memberSnap)
      )
    })
  }, []); 

  return children;
}

export default GetState