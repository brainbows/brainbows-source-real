import React from 'react';
import PropTypes from 'prop-types';

const ChatBox = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <strong>{message.sender}: </strong>
          <span>{message.text}</span>
        </div>
      ))}
    </div>
  );
};

ChatBox.propTypes = {
  messages: PropTypes.string,
};
export default ChatBox;
