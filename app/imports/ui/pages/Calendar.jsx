import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
/* import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor'; */
import EventMod from './EventMod';
import { Events } from '../../api/stuff/Events';

/* const EventSchema = new SimpleSchema({
  title: String,
  startTime: Date,
  endTime: Date,
  description: {
    type: String,
    optional: false,
  },
});

 */

const Calendar = () => {
  const [openMod, setOpenMod] = useState(false);
  const [events, setEvents] = useState([]);

  // Convert numbers to time
  const numberToTime = (num, isEndTime) => {
    // Convert string to int
    const intNum = parseInt(num, 10);

    // Calculation of hours and minutes
    let hours;
    if (isEndTime) {
      hours = Math.floor((intNum - 20) / 2) + 8;
    } else {
      hours = Math.floor((intNum - 1) / 2) + 8;
    }
    const minutes = (intNum % 2) * 30;

    // Time String
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const stuffs = Events.collection.find().fetch();

    const FormattedEvents = stuffs.map(stuff => ({
      title: stuff.title,
      start: new Date(`1970-01-01T${numberToTime(stuff.startTime, false)}:00`),
      end: new Date(`1970-01-01T${numberToTime(stuff.endTime, true)}:00`),
    }));

    setEvents(FormattedEvents);
  }, []);

  const handleDateClick = () => {
    console.log('Date clicked!');
    setOpenMod(true);
  };

  return (
    <div id="calendar-page" className="fullCalendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        weekends
        events={events}
      />
      <EventMod isOpen={openMod} onClose={() => setOpenMod(false)} />
    </div>
  );
};

export default Calendar;
