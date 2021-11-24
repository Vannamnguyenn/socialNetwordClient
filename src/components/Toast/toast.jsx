import React from "react";
import Toast from "react-bootstrap/Toast";
import "./toast.scss";
import { useSelector, useDispatch } from "react-redux";
import { GlobalTypes } from "../../redux/types/globalTypes";

const ToastMessage = () => {
  const { message, type, showToast } = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const handleClose = () =>
    dispatch({
      type: GlobalTypes.SET_TOAST,
      payload: {
        message: null,
        showToast: false,
        type: null,
      },
    });
  return (
    <div className="contain-toast">
      <Toast
        bg={type}
        onClose={() => handleClose()}
        show={showToast}
        delay={3000}
        animation={true}
        autohide={true}
      >
        <Toast.Body className="toast-body-custom">
          {message}
          <i onClick={handleClose} className="fas fa-times-circle"></i>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastMessage;
