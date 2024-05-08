import React from 'react';
import ChatInterface from '../components/chatInterface';

const ChatSystem = () => {
  return (
    <div className="chat-system-container">
      <div className="title">
        <h1>Chatting!!!</h1>
      </div>
      <div className="content">
        <div className="chat-interface-container">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
