import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeIsReadNotify,
  changeNofifyOn,
  getNotifies,
} from "../../redux/actions/notifyAction";
import "./notify.scss";

const NotifyModal = () => {
  const { isNotifyOn, notifies } = useSelector((state) => state.notify);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleReadNotify = (msg) => {
    dispatch(changeIsReadNotify(msg, user._id));
  };

  useEffect(() => {
    dispatch(getNotifies());
  }, [dispatch]);

  return (
    <Dropdown.Menu className="contain-notify">
      <Dropdown.Item
        as={() => (
          <div className="d-flex align-items-center justify-content-between py-2 px-3">
            <b>Notifies</b>
            {isNotifyOn ? (
              <i
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(changeNofifyOn(false))}
                className="fas fa-bell text-danger"
              ></i>
            ) : (
              <i
                className="fas fa-bell-slash text-muted"
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(changeNofifyOn(true))}
              ></i>
            )}
          </div>
        )}
      ></Dropdown.Item>
      {notifies &&
        notifies.map((msg) => (
          <Dropdown.Item
            key={msg._id}
            as={() => (
              <Link to={msg.url} onClick={handleReadNotify.bind(this, msg)}>
                <div className="d-flex align-items-center justify-content-between py-2 px-3 item-notify">
                  <img src={msg.user?.avatar} alt="Avatar" />
                  <div>
                    <p>
                      <b>{msg.user.fullname}</b> {msg.text}
                    </p>
                    {msg.content && (
                      <p className="text-muted">
                        {msg.content.slice(0, 30)}...
                      </p>
                    )}
                  </div>
                  {msg.isRead.includes(user._id) && (
                    <div className="is-read-notify">
                      <i className="fas fa-circle"></i>
                    </div>
                  )}
                </div>
              </Link>
            )}
          ></Dropdown.Item>
        ))}
    </Dropdown.Menu>
  );
};

export default NotifyModal;
