import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EventMod = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, startTime, endTime, description });
    onClose();
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="studyForm.ControlInput1">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="Enter Event Title"
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="studyForm.ControlSelectArea1"
          >
            <Form.Label>Start Time Selector</Form.Label>
            <Form.Control
              as="select"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            >
              <option>Choose a start time</option>
              <option value="1">8:00 AM</option>
              <option value="2">9:00 AM</option>
              <option value="3">10:00 AM</option>
              <option value="4">11:00 AM</option>
              <option value="5">12:00 AM</option>
              <option value="6">1:00 PM</option>
              <option value="7">2:00 PM</option>
              <option value="8">3:00 PM</option>
              <option value="9">4:00 PM</option>
              <option value="10">5:00 PM</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="studyForm.ControlSelectArea2"
          >
            <Form.Label>End Time Selector</Form.Label>
            <Form.Control
              as="select"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            >
              <option>Choose an end time</option>
              <option value="1">8:00 AM</option>
              <option value="2">9:00 AM</option>
              <option value="3">10:00 AM</option>
              <option value="4">11:00 AM</option>
              <option value="5">12:00 AM</option>
              <option value="6">1:00 PM</option>
              <option value="7">2:00 PM</option>
              <option value="8">3:00 PM</option>
              <option value="9">4:00 PM</option>
              <option value="10">5:00 PM</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="studyForm.ControlTextArea1"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              placeholder="Provide a quick description and the link to sign up"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
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
