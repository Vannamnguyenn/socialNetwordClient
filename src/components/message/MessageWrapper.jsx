import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../redux/actions/messageAction";
import ModalActionConversation from "../Modals/ModalActionCoversation";
import CallAction from "./CallAction";
import InputMessage from "./InputMessage";
import MessageContain from "./MessageContain";

const MessageWrapper = () => {
  const { currentConversation } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const [currentChat, setCurrentChat] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    currentConversation &&
      dispatch(getMessages(currentConversation._id)) &&
      setCurrentChat(
        currentConversation.recipients.find((u) => u._id !== user._id)
      );
  }, [currentConversation, dispatch, user._id]);

  return (
    <div className="chat-container-message">
      <div className="chat-container-message-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src={currentChat?.avatar} width="25" height="25" alt="" />
            <span>{currentChat?.fullname}</span>
          </div>
          <div className="d-flex align-items-center">
            <CallAction currentChat={currentChat} user={user} />
            <ModalActionConversation />
          </div>
        </div>
      </div>
      <div className="chat-body">
        {currentConversation && <MessageContain />}
      </div>
      <div className="chat-bottom">
        <InputMessage />
      </div>
    </div>
  );
};

export default MessageWrapper;
