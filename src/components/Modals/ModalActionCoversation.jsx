import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleleConversation } from "../../redux/actions/messageAction";
import "./modalActionPost.scss";

const ModalActionConversation = () => {
  const [show, setShow] = useState(false);
  const { currentConversation } = useSelector((state) => state.message);

  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };

  const dispatch = useDispatch();

  const handleDeleteConversation = async () => {
    currentConversation &&
      (await dispatch(deleleConversation(currentConversation?._id)));
    setShow(false);
  };

  return (
    <>
      <i className="fas fa-info-circle" onClick={handleOpen}></i>
      {show && (
        <Modal
          show={show}
          onHide={handleClose}
          centered
          className="modal-action-post"
          animation={false}
        >
          <Modal.Body>
            <ul className="text-center text-muted">
              <li onClick={handleDeleteConversation}>
                <b className="text-danger">Delete conversation</b>
              </li>
              <li>
                <b>Report</b>
              </li>
              <li onClick={handleClose}>
                <b>Cancel</b>
              </li>
            </ul>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ModalActionConversation;
