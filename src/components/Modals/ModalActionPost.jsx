import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost } from "../../redux/actions/postAction";
import { SET_STATE_UPDATE_POST } from "../../redux/types/stateUpdatePostTypes";
import { CLIENT_URL } from "../../until/constant";
import "./modalActionPost.scss";

const ModalActionPost = ({ post }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  const linkPostRef = useRef();

  const handleCoppyLink = () => {
    window.navigator.clipboard.writeText(linkPostRef.current.value);
    alert("Coppied to clipboard !");
    setShow(false);
  };

  const handleDeletePost = async (id) => {
    await dispatch(deletePost(id));
    setShow(false);
    return history.push("/");
  };

  const setStateUpdatePost = () => {
    dispatch({
      type: SET_STATE_UPDATE_POST,
      payload: {
        show: true,
        post,
      },
    });
    setShow(false);
  };

  return (
    <>
      <div className="post-header-menu">
        <svg
          aria-label="More options"
          className="_8-yf5 "
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="27"
          onClick={handleOpen}
        >
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6.5" cy="12" r="1.5"></circle>
          <circle cx="17.5" cy="12" r="1.5"></circle>
        </svg>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="modal-action-post"
        animation={false}
      >
        <Modal.Body>
          <ul className="text-center text-muted">
            {post.user._id === user._id && (
              <>
                <li onClick={handleDeletePost.bind(this, post._id)}>
                  <b className="text-danger">Delete</b>
                </li>
                <li onClick={setStateUpdatePost}>
                  <b>Edit</b>
                </li>
              </>
            )}
            <li onClick={handleCoppyLink}>
              <b>Coppy link</b>
              <input
                type="text"
                style={{ display: "none" }}
                ref={linkPostRef}
                defaultValue={`${CLIENT_URL}/${post._id}`}
              />
            </li>
            <li onClick={handleClose}>
              <b>Cancel</b>
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalActionPost;
