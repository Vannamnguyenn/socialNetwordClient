import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/actions/postAction";
import { toastAction } from "../../redux/actions/toastAction";
import { SET_STATE_UPDATE_POST } from "../../redux/types/stateUpdatePostTypes";
import TextFieldUpdatePost from "./TextFieldUpdatePost";
import "./updatePostModal.scss";

const UpdatePostModal = () => {
  const { show, post } = useSelector((state) => state.stateUpdatePost);

  const dispatch = useDispatch();

  const [imageArr, setImageArr] = useState([]);
  const content = useRef();

  const handleChangeFiles = (e) => {
    const files = [...e.target.files];

    for (let file of files) {
      if (!file.type.includes("image") && !file.type.includes("video")) {
        return dispatch(
          toastAction({
            success: false,
            msg: "Please choose file image or video !",
          })
        );
      }
      if (file.size > 1024 * 1024 * 7) {
        return dispatch(
          toastAction({
            success: false,
            msg: "Please choose file  smaller than 7mb !",
          })
        );
      }
    }
    setImageArr([...imageArr, ...files]);
  };

  const handleClose = () => {
    dispatch({
      type: SET_STATE_UPDATE_POST,
      payload: {
        show: false,
        post: null,
      },
    });
  };

  const handleDeleteFile = (index) => {
    let newArr = [...imageArr];
    newArr.splice(index, 1);
    setImageArr(newArr);
  };

  useEffect(() => {
    if (post) {
      setImageArr(post.images);
    }
  }, [post]);

  const handleSubmit = (id) => {
    dispatch(
      updatePost(id, {
        content: content.current.value,
        newImages: imageArr,
        oldPost: post,
      })
    );
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="update-post-modal"
    >
      <Modal.Header>
        <Modal.Title>
          <h4>Update post</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="update-post-body">
        <TextFieldUpdatePost ref={content} post={post} />

        <div className="row">
          {post &&
            imageArr.map((image, index) => (
              <div key={index} className="col-4 mb-4 item">
                <div>
                  <i
                    className="fas fa-times-circle"
                    onClick={handleDeleteFile.bind(this, index)}
                  ></i>
                  {image.url ? (
                    <>
                      {" "}
                      {image.url.match(/video/i) ? (
                        <video
                          controls
                          src={image.url}
                          className="d-block w-100"
                          height="150"
                        ></video>
                      ) : (
                        <img
                          className="d-block w-100"
                          height="150"
                          src={image.url}
                          alt=""
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {image.type.match(/video/i) ? (
                        <video
                          controls
                          src={URL.createObjectURL(image)}
                          className="d-block w-100"
                          height="150"
                        ></video>
                      ) : (
                        <img
                          className="d-block w-100"
                          height="150"
                          src={URL.createObjectURL(image)}
                          alt=""
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

          <div className="col-4 mb-4 item">
            <label htmlFor="images">
              <img
                className="d-block w-100"
                height="150"
                src="https://cdn2.iconfinder.com/data/icons/transparent-round-icons/512/add.png"
                alt=""
              />
              <input
                type="file"
                style={{ display: "none" }}
                multiple
                id="images"
                onChange={handleChangeFiles}
              />
            </label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit.bind(this, post?._id)}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePostModal;
