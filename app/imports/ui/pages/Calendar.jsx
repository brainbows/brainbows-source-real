import React, { useState } from 'react';
import EventMod from './.../components/EventMod';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const EventSchema = new SimpleSchema({
  title: String,
  startTime: Date,
  endTime: Date,
  description: {
    type: String,
    optional: false,
  },
});

const bridge = new SimpleSchema2Bridge(EventSchema);

const Calendar = () => {
  const [openMod, setOpenMod] = useState(false);

  const handleDateClick = () => {
    setOpenMod(true);
  };

  const submit = (eventData) => {
    const { title, startTime, endTime, description } = eventData;
    setOpenMod(false);
  };

  return (
    <div>
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
