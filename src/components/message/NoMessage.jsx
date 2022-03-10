import React from "react";

const NoMessage = () => {
  return (
    <div className="chat-container">
      <div className="chat-container-no-message d-flex align-center justify-content-center">
        <div className="chat-container-no-message-wrapper text-center">
          <i className="fas fa-comments"></i>
          <h3>Your message</h3>
          <p>Send private photos and messages to a friend or group.</p>
          <button>Send message</button>
        </div>
      </div>
    </div>
  );
};

export default NoMessage;
