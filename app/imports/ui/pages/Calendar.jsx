import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import EventMod from './EventMod';
import { Students } from '../../api/student/Student';

const EventSchema = new SimpleSchema({
  title: String,
  startTime: Date,
  endTime: Date,
  description: {
    type: String,
    optional: false,
  },
});

const Calendar = () => {
  const [openMod, setOpenMod] = useState(false);

  const handleDateClick = () => {
    console.log('Date clicked!');
    setOpenMod(true);
  };

  const submit = (eventData, formRef) => {
    const { title, startTime, endTime, description } = eventData;
    const owner = Meteor.user().username;
    EventSchema.validate(eventData);
    Students.collection.insert(
      { title, startTime, endTime, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
    setOpenMod(false);
  };

  return (
    <div id="calendar-page" className="fullCalendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        weekends
        events={[
          { title: 'sample1', date: '2024-04-01' },
        ]}
      />
      <EventMod isOpen={openMod} onClose={() => setOpenMod(false)} onSubmit={submit} />
    </div>
  );
};

export default Calendar;
