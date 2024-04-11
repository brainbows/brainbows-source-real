import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EventMod = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [openMod, setOpenMod] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, startTime, endTime, description });
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label htmlFor="start time">
            Start Time:
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </label>
          <label htmlFor="end time">
            End Time:
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          </label>
          <label htmlFor="description">
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

EventMod.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EventMod;
