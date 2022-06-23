import MenuContext from 'context/MenuContext';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { visitedEventsState } from '../../store/slices/visitedEventsSlice';

const VisitedEventsList = () => {
    const visitedEvents = useSelector(visitedEventsState);
    const {currentVisitedEventsPage} = useContext(MenuContext)
    return (
      <>
        {currentVisitedEventsPage && currentVisitedEventsPage.map((event, id) => (
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