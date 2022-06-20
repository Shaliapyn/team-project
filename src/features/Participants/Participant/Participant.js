import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { updateDoc, doc } from 'firebase/firestore';
import { eventsCollection } from 'firebase-client';

import { memberState } from 'store/slices/membersSlice';
import Comment from '../../Comment';

const Participant = ({ participant, currentEvent }) => {
  let additionalPoints = participant.addPoints;
  let visited = participant.visitedEvent;
  
  const [inputPoints, setInputPoints] = useState(0);
  const members = useSelector(memberState);
  const currentMember = members.find(member => member.id === participant.id);
  const event = currentEvent.currentEvent;
    
  const updatePoints = async (additionalPoints) => {
    const docRef = doc(eventsCollection, event.id, 'participants', participant.id);
    
    await updateDoc(docRef, {
      addPoints: additionalPoints
    });
  }

  const updateVisitedState = async (visited) => {
    const docRef = doc(eventsCollection, event.id, 'participants', participant.id);
    
    await updateDoc(docRef, {
      visitedEvent: visited
    });
  }

  const increasePoints = () => {
    additionalPoints += inputPoints;
    updatePoints(additionalPoints);
  }
  
  const decreasePoints = () => {
    additionalPoints -= inputPoints;
    updatePoints(additionalPoints);
  }

  const changeVisitedState = () => {
    visited = !visited;
    updateVisitedState(visited);
  }

  return (
    <tr style={{backgroundColor: visited ? '#edf6f8' : 'white'}}>
      <td>
        <input 
          type="checkbox"
          checked={visited ? true : false}
          onChange={changeVisitedState}
        />
      </td>
      <td><img src={require('../../../assets/images/eventAvatar.png')} alt="Profile Avatar" /></td>
      <td>{currentMember.firstName}</td>
      <td>{currentMember.lastName}</td>
      <td>{participant.addPoints}</td>
      <td className='w-auto'>
        <form  >
            <div className="input-group" style={{width: '190px'}} >
              <input 
                type="text" 
                className="form-control" 
                placeholder="Additional points" 
                aria-describedby="button-addon2" 
                onChange={e => setInputPoints(Number(e.target.value))} 
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={increasePoints}
              >
                +
              </button>
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={decreasePoints}
              >
                -
              </button>
            </div>
        </form>
      </td>
      <td style={{textAlign: 'center'}}>
        <Comment participant={participant} currentEvent={currentEvent} />
      </td>
    </tr>
  )
}

export default Participant