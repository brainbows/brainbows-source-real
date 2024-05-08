import React from 'react';
import ChatInterface from '../components/chatInterface';

// eslint-disable-next-line arrow-body-style
const ChatSystem = ({ student }) => {
  return (
    <div className="chat-system-container">
      <div className="title">
        <h1 style={{ textAlign: 'center' }}>Chat with {student.name}</h1>
      </div>
      <div className="content">
        <ChatInterface student={student} />
      </div>
    </div>
  );
};

export default ChatSystem;
