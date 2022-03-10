import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../redux/actions/messageAction";
import { toastAction } from "../../redux/actions/toastAction";
import EmotionPicker from "../EmotionPicker/EmotionPicker";
import MessageShowMediaUpload from "./MessageShowMediaUpload";

const InputMessage = () => {
  const [showPinker, setShowPicker] = useState(false);
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { currentConversation } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const [content, setContent] = useState("");
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleChangeFiles = (e) => {
    const newFiles = [...e.target.files];

    for (let file of newFiles) {
      if (file.size > 1024 * 1024 * 7) {
        return dispatch(
          toastAction({
            success: false,
            msg: "Please choose file smaller than 7mb !",
          })
        );
      }
      if (!file.type.includes("image") && !file.type.includes("video")) {
        return dispatch(
          toastAction({
            success: false,
            msg: "Please choose image or video !",
          })
        );
      }
    }
    setFiles([...e.target.files]);
  };

  const removeFile = (lastModified) => {
    setFiles(files.filter((file) => file.lastModified !== lastModified));
  };

  const handleCreateMessage = () => {
    if (!content && files.length === 0) {
      return;
    }
    dispatch(
      createMessage(
        {
          text: content,
          files,
          conversation: currentConversation._id,
          recipients: currentConversation.recipients.find(
            (u) => u._id !== user._id
          )._id,
        },
        socket
      )
    );
    setContent("");
    setFiles([]);
  };

  const handleKeyPressInput = (e) => {
    if (e.which === 13) {
      handleCreateMessage();
    }
  };

  return (
    <div className="chat-bottom-contain">
      <MessageShowMediaUpload files={files} removeFile={removeFile} />
      <div
        className="post-bottom-addcomment-left"
        onClick={() => setShowPicker(true)}
      >
        <svg
          aria-label="Emoji"
          className="_8-yf5 "
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 48 48"
          width="24"
        >
          <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
          <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
        </svg>
        <EmotionPicker
          show={showPinker}
          onHide={setShowPicker}
          callback={setContent}
          content={content}
        />
      </div>
      <div className="ms-3 me-3 input-message">
        <input
          type="text"
          onKeyPress={handleKeyPressInput}
          autoFocus
          onChange={handleChangeContent}
          value={content}
        />
      </div>
      <label htmlFor="media" style={{ lineHeight: "18px" }}>
        <i className="far fa-image"></i>
      </label>
      <input
        type="file"
        id="media"
        className="hide"
        multiple
        accept="image/*,video/*"
        onChange={handleChangeFiles}
      />
      <i
        className="fas fa-heart"
        style={
          content.length > 0 || files.length > 0 ? { marginRight: 10 } : {}
        }
      ></i>
      {(content.length > 0 || files.length > 0) && (
        <i
          className="fas fa-paper-plane sendMessage"
          onClick={handleCreateMessage}
        ></i>
      )}
    </div>
  );
};

export default React.memo(InputMessage);
