import React, { useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { format } from "timeago.js";
import { deleteMessage } from "../../redux/actions/messageAction";
import CustomToggleMessageAction from "./CustomToggleMessageAction";

const MessageItem = ({ own, m }, ref) => {
  const messageRef = useRef();
  const dispatch = useDispatch();
  const handleRemoveMessage = () => {
    dispatch(deleteMessage(m._id));
  };
  const handleCoppyMessage = () => {
    window.navigator.clipboard.writeText(messageRef.current.value);
    alert("Coppied to clipboard !");
  };
  return (
    <div
      className={`messages-contain-item ${own && "messages-contain-own"}`}
      ref={ref}
    >
      <p className="timeline">{format(m.createdAt)}</p>
      {m.text && (
        <div className="messages-contain-item-info">
          {own && (
            <div className="action-message">
              <Dropdown className="position-relative">
                <Dropdown.Toggle
                  as={CustomToggleMessageAction}
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <b className="me-3" onClick={handleCoppyMessage}>
                      Coppy
                    </b>
                    <input
                      type="text"
                      style={{ display: "none" }}
                      ref={messageRef}
                      defaultValue={m.text}
                    />
                    <b onClick={handleRemoveMessage}>Remove</b>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
          <p>{m.text}</p>
        </div>
      )}
      {m.media.length > 0 && (
        <div
          className={`messages-contain-item-media ${
            own && "own-media"
          } position-relative`}
        >
          {!m.text && (
            <div
              className="action-message action-message-not-text"
              style={{ left: 0 }}
            >
              <Dropdown className="position-relative">
                <Dropdown.Toggle
                  as={CustomToggleMessageAction}
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <b className="me-3" onClick={handleCoppyMessage}>
                      Coppy
                    </b>
                    <input
                      type="text"
                      style={{ display: "none" }}
                      ref={messageRef}
                      defaultValue={m.text}
                    />
                    <b onClick={handleRemoveMessage}>Remove</b>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
          {m.media.map((f, index) =>
            f.url.includes("image") ? (
              <a
                key={index}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={f.url}
                  alt=""
                  className={`${m.media.length >= 3 && "multiple-row"}`}
                />
              </a>
            ) : (
              <a
                key={index}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginBottom: "-10px" }}
              >
                <video
                  src={f.url}
                  className={`${m.media.length >= 3 && "multiple-row"}`}
                  controls
                ></video>
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(MessageItem);
