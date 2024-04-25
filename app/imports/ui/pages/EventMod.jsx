import { AutoForm, TextField, LongTextField, SelectField, SubmitField } from 'uniforms-bootstrap4';
import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { ErrorsField } from 'uniforms-bootstrap5';
import { Stuffs } from '../../api/stuff/Stuff';

const formSchema = new SimpleSchema({
  title: String,
  startTime: Number,
  endTime: Number,
  description: {
    type: String,
    optional: false,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EventMod = ({ isOpen, onClose }) => {
  const handleSubmit = (data, formRef) => {
    const { title, startTime, endTime } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert(
      { title, startTime, endTime, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();

          const calendarEvents = document.getElementById('calendar-page');
          const calendar = new FullCalendar.Calendar(calendarEvents, {
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            weekends: true,
            events: [
              // Other events...
              { title, start, end },
            ],
          });
          calendar.render();
        }
      },
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create StudySesh</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AutoForm schema={bridge} onSubmit={handleSubmit}>
          <TextField name="title" placeholder="Enter Event Title" />
          <SelectField
            name="startTime"
            placeholder="Choose a start time"
            options={[
              { label: '8:00 AM', value: '1' },
              { label: '8:30 AM', value: '2' },
              { label: '9:00 AM', value: '3' },
              { label: '9:30 AM', value: '4' },
              { label: '10:00 AM', value: '5' },
              { label: '10:30 AM', value: '6' },
              { label: '11:00 AM', value: '7' },
              { label: '11:30 AM', value: '8' },
              { label: '12:00 PM', value: '9' },
              { label: '12:30 PM', value: '10' },
              { label: '1:00 PM', value: '11' },
              { label: '1:30 PM', value: '12' },
              { label: '2:00 PM', value: '13' },
              { label: '2:30 PM', value: '14' },
              { label: '3:00 PM', value: '15' },
              { label: '3:30 PM', value: '16' },
              { label: '4:00 PM', value: '17' },
              { label: '4:30 PM', value: '18' },
              { label: '5:00 PM', value: '19' },
            ]}
          />
          <SelectField
            name="endTime"
            placeholder="Choose an end time"
            options={[
              { label: '8:00 AM', value: '1' },
              { label: '8:30 AM', value: '2' },
              { label: '9:00 AM', value: '3' },
              { label: '9:30 AM', value: '4' },
              { label: '10:00 AM', value: '5' },
              { label: '10:30 AM', value: '6' },
              { label: '11:00 AM', value: '7' },
              { label: '11:30 AM', value: '8' },
              { label: '12:00 PM', value: '9' },
              { label: '12:30 PM', value: '10' },
              { label: '1:00 PM', value: '11' },
              { label: '1:30 PM', value: '12' },
              { label: '2:00 PM', value: '13' },
              { label: '2:30 PM', value: '14' },
              { label: '3:00 PM', value: '15' },
              { label: '3:30 PM', value: '16' },
              { label: '4:00 PM', value: '17' },
              { label: '4:30 PM', value: '18' },
              { label: '5:00 PM', value: '19' },
            ]}
          />
          <LongTextField name="description" placeholder="Provide a quick description and the link to sign up" />
          <SubmitField value="Save Changes" />
          <ErrorsField />
        </AutoForm>
      </Modal.Body>
    </Modal>
  );
};

EventMod.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EventMod;
