import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListFriendChat from "../components/message/ListFriendChat";
import MessageWrapper from "../components/message/MessageWrapper";
import ModalFindChat from "../components/Modals/ModalFindChat";
import NoMessage from "../components/message/NoMessage";
import "../style/message.scss";

const Messager = () => {
  const { conversations } = useSelector((state) => state.message);

  return (
    <Container className="messages-wrapper">
      <div className="row">
        <div className="col-4">
          <div className="list-chat">
            <div className="list-chat-header d-flex">
              <div className="list-chat-header-left text-center">
                <b>nguyenvannam1101</b>
              </div>
              <div className="list-chat-header-right">
                <ModalFindChat />
              </div>
            </div>
            <ListFriendChat />
          </div>
        </div>
        <div className="col-8">
          {conversations.length > 0 && <MessageWrapper />}
          {conversations.length === 0 && <NoMessage />}
        </div>
      </div>
    </Container>
  );
};

export default Messager;
