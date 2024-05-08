import React from 'react';
import ChatInterface from '../components/chatInterface';

// eslint-disable-next-line arrow-body-style
const ChatSystem = ({ students }) => {
  return (
    <div className="chat-system-container">
      <div className="title">
        <h1 style={{ textAlign: 'center' }}>Chat with {students.name}</h1>
      </div>
      <div className="content">
        <ChatInterface students={students} />
      </div>
    </div>
  );
};

export default ChatSystem;
