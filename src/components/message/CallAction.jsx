import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalTypes } from "../../redux/types/globalTypes";

const CallAction = ({ currentChat, user }) => {
  const dispatch = useDispatch();
  const peer = useSelector((state) => state.peer);
  const socket = useSelector((state) => state.socket);

  const handleOpenCall = ({ video }) => {
    const { _id, fullname, avatar, email } = currentChat;
    dispatch({
      type: GlobalTypes.CALL,
      payload: {
        video,
        _id,
        fullname,
        avatar,
        email,
      },
    });
    handleCallToUser(video);
  };

  const handleCallToUser = (video) => {
    const { _id, fullname, avatar, email } = user;
    const msg = {
      sender: _id,
      recipient: currentChat._id,
      otherName: currentChat.fullname,
      fullname,
      avatar,
      email,
      video,
    };
    if (peer.open) msg.peerID = peer._id;
    socket.emit("callUser", msg);
  };

  return (
    <>
      <i
        onClick={handleOpenCall.bind(this, { video: false })}
        className="fas fa-phone"
      ></i>
      <i
        onClick={handleOpenCall.bind(this, { video: true })}
        className="fas fa-video"
      ></i>
    </>
  );
};

export default CallAction;
