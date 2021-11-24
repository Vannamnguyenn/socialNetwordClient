import React, { useState } from "react";
import { Button } from "react-bootstrap";
import EmotionPicker from "../EmotionPicker/EmotionPicker";

const SharePost = ({ user, onSubmit }) => {
  const [content, setContent] = useState("");
  const [showPinker, setShowPicker] = useState(false);

  const handleConentChange = (e) => {
    if (content.length > 5000) return;
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(content);
  };

  return (
    <div className="write-caption">
      <div className="write-caption-user">
        <div>
          <img src={user.avatar} alt="" />
          <p>
            <b>{user.slug}</b>
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={handleSubmit}>
          Share
        </Button>
      </div>
      <textarea value={content} onChange={handleConentChange}></textarea>
      <div className="count-text-emotion">
        <i
          onClick={() => setShowPicker(!showPinker)}
          className="far fa-smile"
        ></i>

        <EmotionPicker
          show={showPinker}
          onHide={setShowPicker}
          callback={setContent}
          content={content}
        />

        <span className="text-muted">{content.length}/2500</span>
      </div>
    </div>
  );
};

export default SharePost;
