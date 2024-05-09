import { AutoForm, TextField, LongTextField, SelectField, SubmitField } from 'uniforms-bootstrap4';
import React, { useRef } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events/Events';

const formSchema = new SimpleSchema({
  title: String,
  startTime: Number,
  endTime: Number,
  description: {
    type: String,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

// eslint-disable-next-line react/prop-types
const EventMod = ({ isOpen, onClose, onSubmit, clickedDate }) => {

  const formRef = useRef(null);

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

  const handleSubmit = (data) => {
    const { title, startTime, endTime, description } = data;
    const owner = Meteor.user().username;

    // Use the clicked date when creating a new event
    const start = new Date(`${clickedDate}T${numberToTime(startTime, false)}:00Z`);
    const end = new Date(`${clickedDate}T${numberToTime(endTime, true)}:00Z`);
    Events.collection.insert(
      { title, startTime: start, endTime: end, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.current.reset();
          onSubmit({
            title,
            start: new Date(`${clickedDate}T${numberToTime(startTime, false)}:00`),
            end: new Date(`${clickedDate}T${numberToTime(endTime, true)}:00`),
            description,
          });
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
        <AutoForm ref={formRef} schema={bridge} onSubmit={handleSubmit}>
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
              { label: '8:00 AM', value: '21' },
              { label: '8:30 AM', value: '22' },
              { label: '9:00 AM', value: '23' },
              { label: '9:30 AM', value: '24' },
              { label: '10:00 AM', value: '25' },
              { label: '10:30 AM', value: '26' },
              { label: '11:00 AM', value: '27' },
              { label: '11:30 AM', value: '28' },
              { label: '12:00 PM', value: '29' },
              { label: '12:30 PM', value: '30' },
              { label: '1:00 PM', value: '31' },
              { label: '1:30 PM', value: '32' },
              { label: '2:00 PM', value: '33' },
              { label: '2:30 PM', value: '34' },
              { label: '3:00 PM', value: '35' },
              { label: '3:30 PM', value: '36' },
              { label: '4:00 PM', value: '37' },
              { label: '4:30 PM', value: '38' },
              { label: '5:00 PM', value: '39' },
            ]}
          />
          <LongTextField name="description" placeholder="Provide a quick description and the link to sign up" />
          <SubmitField value="Save Changes" />
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
