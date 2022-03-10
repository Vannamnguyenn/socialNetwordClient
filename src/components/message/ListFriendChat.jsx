import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../redux/actions/messageAction";
import { SET_CURRENT_CONVERSATION } from "../../redux/types/messageTypes";

const ListFriendChat = () => {
  const dispatch = useDispatch();
  const { conversations, currentConversation } = useSelector(
    (state) => state.message
  );
  const { user } = useSelector((state) => state.auth);

  const handleChangeConversation = (id) => {
    dispatch({
      type: SET_CURRENT_CONVERSATION,
      payload: conversations.find((c) => c._id === id),
    });
  };

  useEffect(() => {
    dispatch(getConversations());
  }, [user, dispatch]);

  return (
    <ul className="list-chat-items">
      {currentConversation &&
        conversations
          .map((c) => {
            for (let u of [...c.recipients]) {
              if (u._id !== user._id) {
                if (c.text) {
                  u["text"] = c.text;
                }
                u["current"] = c._id;
                return u;
              }
            }
            return null;
          })
          .map((p, index) => (
            <li
              key={index}
              className={`list-chat-item ${
                p.current === currentConversation._id ? "active" : ""
              }`}
              onClick={handleChangeConversation.bind(this, p.current)}
            >
              <div className="d-flex">
                <img src={p.avatar} width="50" height="50" alt="" />
                <div className="list-chat-item-info">
                  <p>{p.fullname}</p>
                  <span>{p.text || "Let chat now !"}</span>
                  {/* <span className="timeago">14s</span> */}
                </div>
              </div>
            </li>
          ))}
    </ul>
  );
};

export default ListFriendChat;
