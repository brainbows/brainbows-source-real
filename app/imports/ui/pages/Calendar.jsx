import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
/* import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff'; */
import EventMod from './EventMod';
import { Stuffs } from '../../api/stuff/Stuff';

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

  useEffect(() => {
    const stuffs = Stuffs.collection.find().fetch();

    const FormattedEvents = stuffs.map(stuff => ({
      title: stuff.title,
      start: stuff.startTime,
      end: stuff.endTime,
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
