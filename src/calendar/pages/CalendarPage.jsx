import { useContext, useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { is } from 'date-fns/locale';
import { MyProvider } from '../../hooks/Mycontext';



export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );
  
  const [parentState, setParentState] = useState(true)
  const [parentState2, setParentState2] = useState(true)

  
  const updateParentState = (value) => {
    setParentState(value)
  }
  const updateParentState2 = (value) => {
    setParentState2(value)
  }
  
  const eventStyleGetter = ( event, start, end, isSelected ) => {
    
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    
    let display;
    if (parentState && parentState2) {
      display = 'block';
    } else if (parentState) {
      display = isMyEvent ? 'block' : 'none';
    } else if (parentState2) {
      display = !isMyEvent ? 'block' : 'none';
    } else {
      display = 'none';
    }

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: isMyEvent ? 0.8 : 0.4,
      color: 'white',
      fontSize: '14px',
      display: display
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    // console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event );
    setLastView( event )
  }

  useEffect(() => {
    startLoadingEvents()

  }, [])
  



  return (
    <MyProvider>
      <Navbar updateParentState={updateParentState} updateParentState2={ updateParentState2 }/>

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 10px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />


      <CalendarModal />
      
      <FabAddNew />
      <FabDelete />


    </MyProvider>
  )
}
