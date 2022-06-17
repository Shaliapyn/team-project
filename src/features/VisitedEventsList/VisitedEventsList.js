import React from 'react';
import { useSelector } from 'react-redux';

import { visitedEventsState } from '../../store/slices/visitedEventsSlice';

const VisitedEventsList = () => {
    const visitedEvents =useSelector(visitedEventsState);
  
    return (
      <>
        {visitedEvents && visitedEvents.map((event, id) => (
          <tr key={id}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{Number(event.score) + Number(event.addPoints)}</td>
          </tr>
        ))}
      </>
    )
}

export default VisitedEventsList