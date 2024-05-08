import React, { useState } from 'react';
import ChatBox from './ChatBox';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, { text: inputText, sender: 'Me' }]);
      setInputText('');
    }
  };

  return (
    <div>
      <h1>Simple Chat App</h1>
      <ChatBox messages={messages} />
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
