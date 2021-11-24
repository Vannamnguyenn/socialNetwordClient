import React, { useEffect, useRef } from "react";
import Picker from "emoji-picker-react";

const EmotionPicker = ({ show, onHide, callback, content }) => {
  const pickerRef = useRef();
  const handleClickOutside = (e) => {
    if (!pickerRef.current.contains(e.target)) {
      onHide(false);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    callback(content + emojiObject.emoji);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div
      className="picker"
      style={{ display: show ? "" : "none", zIndex: "10" }}
      ref={pickerRef}
    >
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default EmotionPicker;
