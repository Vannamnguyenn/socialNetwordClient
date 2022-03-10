import React, { forwardRef, useEffect, useState } from "react";
import EmotionPicker from "../EmotionPicker/EmotionPicker";

const TextFieldUpdatePost = ({ post }, ref) => {
  const [content, setContent] = useState("");
  const [showPinker, setShowPicker] = useState(false);

  const handleConentChange = (e) => {
    if (content.length > 5000) return;
    setContent(e.target.value);
  };
  useEffect(() => {
    if (post) {
      setContent(post.content);
    }
  }, [post]);
  return (
    <React.Fragment>
      <textarea
        ref={ref}
        onChange={handleConentChange}
        value={content}
      ></textarea>
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

        <span className="text-muted">{content.length}/5000</span>
      </div>
    </React.Fragment>
  );
};

export default forwardRef(TextFieldUpdatePost);
