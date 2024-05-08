import React from 'react';
import { useLocation } from 'react-router';
import ChatInterface from '../components/chatInterface';

// eslint-disable-next-line arrow-body-style
const ChatSystem = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get('studentId');

  return (
    <div className="chat-system-container">
      <div className="title">
        <h1 style={{ textAlign: 'center' }}>Chat</h1>
      </div>
      <div className="content">
        {studentId && <ChatInterface studentId={studentId} />}
      </div>
    </div>
  );
};

export default ChatSystem;
