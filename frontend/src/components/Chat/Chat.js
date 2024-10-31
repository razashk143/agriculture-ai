import React, { useState } from "react";
import "./chat.css";
import chatIcon from "../../assets/images/chat.png";
import closeIcon from "../../assets/images/close.png";
function ChatIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {};
  return (
    <div className="chat-container">
      <img
        src={chatIcon}
        alt="Chat Icon"
        className="chat-icon"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="chat-box">
          <img
            className="close-icon"
            src={closeIcon}
            alt="close"
            onClick={() => setIsOpen(!isOpen)}
          />
          <ChatInput onSendMessage={handleSendMessage} />
          <ChatMessages messages={messages} />
        </div>
      )}
    </div>
  );
}

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  return (
    <div className="input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => onSendMessage(message)}>Send</button>
    </div>
  );
}

function ChatMessages({ messages }) {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}

export default ChatIcon;
