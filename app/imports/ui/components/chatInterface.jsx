import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ChatInterface = ({ studentId }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem(`chatMessages_${studentId}`)) || [];
    setMessages(savedMessages);
  }, [studentId]);

  useEffect(() => {
    localStorage.setItem(`chatMessages_${studentId}`, JSON.stringify(messages));
  }, [messages, studentId]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // eslint-disable-next-line no-use-before-define
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputText,
        sender: 'me', // Assuming the current user is the sender
        timestamp: new Date().toISOString(), // You might want to add a timestamp to messages
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText('');
    }
  };
  const deleteMessage = (id) => {
    setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
  };

  return (
    <div className="chat-interface">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={message.sender === 'me' ? 'sent-message' : 'received-message'}>
            <p>{message.sender}: {message.text}</p>
            <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} </span>
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={() => deleteMessage(message.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

ChatInterface.propTypes = {
  studentId: PropTypes.string.isRequired,
};

export default ChatInterface;
