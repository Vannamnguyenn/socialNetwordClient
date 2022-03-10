import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import userAPI from "../../api/userAPI";
import { createConversation } from "../../redux/actions/messageAction";
import "./modalFindChat.scss";

const ModalFindChat = () => {
  const [show, setShow] = useState(false);
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleShowModal = () => {
    setShow(true);
  };
  const handleClose = () => {
    setPeople([]);
    setSearch("");
    setShow(false);
  };
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleMakeConversation = (idPeople) => {
    dispatch(createConversation({ recipients: [idPeople] }));
    setShow(false);
  };

  useEffect(() => {
    (async () => {
      if (search !== "") {
        const response = await userAPI.searchUser(search);
        setPeople(response.data.users);
      }
    })();
  }, [search]);
  return (
    <>
      {" "}
      <i className="fas fa-edit" onClick={handleShowModal}></i>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="modal-find-chat"
        animation={false}
      >
        <Modal.Body>
          <div className="contain-search">
            <input
              type="text"
              className="nav-search"
              placeholder="Search"
              value={search}
              onChange={handleChangeSearch}
            />
            <ul>
              {people.map((p) => (
                <li
                  key={p._id}
                  onClick={handleMakeConversation.bind(this, p._id)}
                >
                  <img src={p.avatar} alt="" />
                  <p>
                    <b>{p.fullname}</b>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFindChat;
