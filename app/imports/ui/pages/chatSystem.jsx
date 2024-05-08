import React from 'react';
import ChatInterface from '../components/chatInterface';
import students from '../components/Students';

// eslint-disable-next-line arrow-body-style
const ChatSystem = () => {
  return (
    <div className="chat-system-container">
      <div className="title">
        <h1 style={{ textAlign: 'center' }}>Chat</h1>
      </div>
      <div className="content">
        <ChatInterface students={students._id} />
      </div>
    </div>
  );
};

export default ChatSystem;
