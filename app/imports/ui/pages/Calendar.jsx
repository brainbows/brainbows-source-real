import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
/* import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'; */
import { Modal, Button } from 'react-bootstrap';
import EventMod from './EventMod';
import { Events } from '../../api/events/Events';

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
  const [clickedDate, setClickedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      start: new Date(`2024-05-08T${numberToTime(stuff.startTime, false)}:00`),
      end: new Date(`2024-05-08T${numberToTime(stuff.endTime, true)}:00`),
      description: stuff.description,
    }));

    setEvents(FormattedEvents);
  }, []);

  console.log(events);

  const handleDateClick = (info) => {
    console.log('Date clicked!');
    setOpenMod(true);

    // Capture and store the clicked date
    // eslint-disable-next-line no-shadow
    const clickedDate = info.dateStr; // Get the date string from the info object
    setClickedDate(clickedDate);
  };

  const handleEventClick = (info) => {
    console.log('Event clicked!');
    setSelectedEvent(info.event);
  };

  return (
    <div id="calendar-page" className="fullCalendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        initialView="dayGridMonth"
        weekends
        events={events}
        eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
      />
      <EventMod
        isOpen={openMod}
        onClose={() => setOpenMod(false)}
        onSubmit={(newEvent) => {
          // Update the events state with the new event
          setEvents((prevEvents) => [...prevEvents, newEvent]);
        }}
        clickedDate={clickedDate}
      />
      {/* New Modal for showing event details */}
      <Modal show={!!selectedEvent} onHide={() => setSelectedEvent(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <>
              <p><strong>Title:</strong> {selectedEvent.title}</p>
              <p><strong>Start Time:</strong> {selectedEvent.start.toString()}</p>
              <p><strong>End Time:</strong> {selectedEvent.end.toString()}</p>
              <p><strong>Description:</strong> {selectedEvent.extendedProps.description}</p> {/* Display the description */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedEvent(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;
