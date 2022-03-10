import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_FOLLOW } from "./redux/types/authType";
import { UPDATE_NOTIFY } from "./redux/types/notifyTypes";
import { UPDATE_POST } from "./redux/types/postTypes";
import notifyMp3 from "./assets/audio/pristine-609.mp3";
import notifyOgg from "./assets/audio/pristine-609.ogg";
import { toastAction } from "./redux/actions/toastAction";
import { CREATE_MESSAGE } from "./redux/types/messageTypes";
import { GlobalTypes } from "./redux/types/globalTypes";

const Socket = () => {
  const { user } = useSelector((state) => state.auth);
  const { isNotifyOn } = useSelector((state) => state.notify);
  const { currentConversation } = useSelector((state) => state.message);
  // const call = useSelector((state) => state.call);
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const audio = useRef(null);
  // add user
  useEffect(() => {
    socket.emit("addUser", { _id: user._id });
  }, [user, socket]);
  //update post
  useEffect(() => {
    socket.on(
      "updatePost",
      (post) => {
        dispatch({
          type: UPDATE_POST,
          payload: {
            post,
            id: post._id,
          },
        });
      },
      [socket]
    );
    return () => socket.off("updatePost");
  });
  // toggle follow
  useEffect(() => {
    socket.on(
      "toggleFollow",
      (user) => {
        dispatch({
          type: UPDATE_FOLLOW,
          payload: {
            id: user.userID,
          },
        });
      },
      [socket]
    );
    return () => socket.off("toggleFollow");
  });
  // notify
  useEffect(() => {
    socket.on("notify", (notify) => {
      isNotifyOn && audio.current.play();
      dispatch({
        type: UPDATE_NOTIFY,
        payload: notify,
      });
    });
    return () => {
      socket.off("notify");
    };
  }, [socket, dispatch, isNotifyOn]);

  // message
  useEffect(() => {
    socket.on("addMessage", (message) => {
      if (
        currentConversation &&
        message.conversation === currentConversation?._id
      ) {
        return dispatch({
          type: CREATE_MESSAGE,
          payload: message,
        });
      }
      audio.current.play();
    });
    return () => socket.off("addMessage");
  }, [socket, dispatch, currentConversation]);

  // callToUser
  useEffect(() => {
    socket.on("callToUser", (msg) => {
      dispatch({ type: GlobalTypes.CALL, payload: msg });
    });
    return () => socket.off("callToUser");
  }, [socket, dispatch]);

  // call busy
  useEffect(() => {
    socket.on("userBusy", (msg) => {
      dispatch(
        toastAction({
          msg: `User ${msg.otherName} is very busy !`,
          isSuccess: false,
        })
      );
      dispatch({
        type: GlobalTypes.CALL,
        payload: null,
      });
    });
    return () => socket.off("userBusy");
  }, [socket, dispatch]);

  return (
    <audio ref={audio} style={{ display: "none" }}>
      <source src={notifyOgg} type="audio/ogg" />
      <source src={notifyMp3} type="audio/mpeg" />
    </audio>
  );
};

export default Socket;
