import React from 'react';
import ChatInterface from '../components/chatInterface';

// eslint-disable-next-line arrow-body-style
const ChatSystem = () => {
  return (
    <div className="chat-system-container">
      <div className="title">
        <h1 style={{ textAlign: 'center' }}>Chat</h1>
      </div>
      <div className="content">
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatSystem;
