import React, { useState, useEffect } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if (savedMessages) {
      setMessages(savedMessages);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

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
        sender: 'Me', // Assuming the current user is the sender
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
          <div key={index} className={message.sender === 'Me' ? 'sent-message' : 'received-message'}>
            <p>{message.sender}: {message.text}</p>
            <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} </span>
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

export default ChatInterface;
