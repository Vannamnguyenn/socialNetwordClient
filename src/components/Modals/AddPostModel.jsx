import React, { useState } from "react";
import {
  Button,
  Carousel,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createPostAction } from "../../redux/actions/postAction";
import { toastAction } from "../../redux/actions/toastAction";
import "./addPostModel.scss";
import SharePost from "./SharePost";

const AddPostModel = ({ path }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [files, setFiles] = useState([]);
  const [showShare, setShowShare] = useState(false);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const handleCreate = () => {
    setShow(true);
  };
  const handleHideModal = () => {
    const check = window.confirm("Do you want to destroy this post !");
    if (check) {
      setShow(false);
      setFiles([]);
      return history.push({ pathname: "/" });
    }
    return;
  };

  const handleChangeInput = (e) => {
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

  const handleSubmit = (content) => {
    dispatch(createPostAction(content, files, user, socket));
    setShow(false);
    setFiles([]);
    return history.push({ pathname: "/" });
  };

  return (
    <>
      <OverlayTrigger
        placement="bottom-start"
        overlay={<Tooltip>New post</Tooltip>}
      >
        <Link to="/create" onClick={handleCreate}>
          <svg
            aria-label="New Post"
            className="_8-yf5 "
            color="#262626"
            fill="#262626"
            height="22"
            role="img"
            viewBox="0 0 48 48"
            width="22"
          >
            {path !== "create-post" && (
              <React.Fragment>
                <path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4C1.6 41.4 0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4 4.1 6.6 1.6 9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4C46.4 6.6 48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4 12.1-2.6 2.5-5.6 4.1-12.2 4.1zM16.2 3C10 3 7.8 4.6 6.1 6.2 4.6 7.8 3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1 1.6 1.6 3.8 3.1 10 3.1h15.6c6.2 0 8.4-1.6 10.1-3.2 1.6-1.6 3.1-3.8 3.1-10V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path>
                <path d="M36.3 25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path>
                <path d="M24 37.8c-.8 0-1.5-.7-1.5-1.5V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v24.6c0 .8-.7 1.5-1.5 1.5z"></path>
              </React.Fragment>
            )}
            {path === "create-post" && (
              <path d="M43.9 4c-2.5-2.4-5.5-4-12.2-4H16.2C9.6 0 6.6 1.6 4 4.1 1.6 6.6 0 9.6 0 16.2v15.5c0 6.6 1.6 9.7 4.1 12.2 2.5 2.4 5.5 4 12.2 4h15.5c6.6 0 9.7-1.6 12.2-4.1 2.4-2.5 4-5.5 4-12.2V16.2c0-6.6-1.6-9.6-4.1-12.2zm-7.6 21.5H25.5v10.8c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h10.8V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v10.8h10.8c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path>
            )}
          </svg>
        </Link>
      </OverlayTrigger>
      <Modal
        size="lg"
        className="modal-create-post text-center background-0-6"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        centered
        onHide={handleHideModal}
        animation={false}
      >
        {files.length <= 0 && (
          <>
            <input
              type="file"
              id="upload"
              multiple
              onChange={handleChangeInput}
            />
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                <h4 className="modal-title">Create post</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="upload-imgage">
                <div className="contain-info">
                  <img
                    src="https://freeiconshop.com/wp-content/uploads/edd/upload-cloud-flat.png"
                    alt=""
                  />
                  <h4>Drag photo and video here</h4>
                  <label htmlFor="upload">Select from computer</label>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
        {files.length > 0 && (
          <div className="contain-slider">
            <div
              className="contain-slider-wrapper"
              style={!showShare ? { maxWidth: "100%", flex: "1" } : {}}
            >
              {!showShare && (
                <Button
                  variant="primary"
                  size="sm"
                  className="btn-next"
                  onClick={() => setShowShare(true)}
                >
                  Next
                </Button>
              )}
              {showShare && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="btn-back"
                  onClick={() => setShowShare(false)}
                >
                  Back
                </Button>
              )}
              <Carousel interval={null} nextLabel="Next">
                {files.map((file, index) => (
                  <Carousel.Item key={index}>
                    {file.type.includes("video") ? (
                      <video
                        src={URL.createObjectURL(file)}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        controls
                      ></video>
                    ) : (
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                    )}
                    {!showShare && (
                      <Button
                        variant="danger"
                        size="sm"
                        className="btn-delete"
                        onClick={() => removeFile(file.lastModified)}
                      >
                        Delete
                      </Button>
                    )}
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            {showShare && <SharePost user={user} onSubmit={handleSubmit} />}
          </div>
        )}
      </Modal>
    </>
  );
};

export default AddPostModel;
