import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={handleDateClick}
      initialView="dayGridMonth"
      weekends
      events={[
        { title: 'sample1', date: '2024-04-01' },
      ]}
    />
  );
};

export default Calendar;
