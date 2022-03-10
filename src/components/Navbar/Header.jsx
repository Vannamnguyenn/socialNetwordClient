import React from "react";
import {
  Container,
  Dropdown,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutAction } from "../../redux/actions/authAction";
import { changeThemeAction } from "../../redux/actions/globalAction";
import { toastAction } from "../../redux/actions/toastAction";
import AddPostModel from "../Modals/AddPostModel";
import CustomToggleNotify from "../Notify/CustomToggleNotify";
import NotifyModal from "../Notify/NotifyModal";
import "./header.scss";
import SearchHeader from "./SearchHeader";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    const data = await dispatch(logoutAction());
    dispatch(toastAction(data));
    history.push({ pathname: "/login" });
    window.location.reload();
  };
  const path = window.location.pathname;
  return (
    <Navbar bg={theme} className="navbar">
      <Container className="navbar-container">
        <div className="navbar-container-left">
          <Link to="/">
            <img
              className="navbar-container-logo"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </Link>
        </div>
        <div className="navbar-container-center">
          <SearchHeader />
        </div>
        <div className="navbar-container-right">
          <div className="nav-right-wrapper">
            <Nav className="nav-right-list">
              <div className="nav-right-item">
                <OverlayTrigger
                  placement="bottom-start"
                  overlay={<Tooltip>Home</Tooltip>}
                >
                  <Link to="/">
                    <svg
                      aria-label="Home"
                      className="_8-yf5 "
                      color="#262626"
                      fill="#262626"
                      height="22"
                      role="img"
                      viewBox="0 0 48 48"
                      width="22"
                    >
                      <path
                        d={
                          path === "/"
                            ? "M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"
                            : "M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"
                        }
                      ></path>
                    </svg>
                  </Link>
                </OverlayTrigger>
              </div>
              <div className="nav-right-item">
                <OverlayTrigger
                  placement="bottom-start"
                  overlay={<Tooltip>Messenger</Tooltip>}
                >
                  <Link to="/">
                    <svg
                      aria-label="Messenger"
                      className="_8-yf5 "
                      color="#262626"
                      fill="#262626"
                      height="22"
                      role="img"
                      viewBox="0 0 48 48"
                      width="22"
                    >
                      <path
                        d={
                          path === "message"
                            ? "M10.2 29.8c-.7 1 .6 2.2 1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6 1.2 3.9.8 5-.9L38 18.2c.7-1-.6-2.2-1.6-1.5L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5 .9l-6.7 10.7zM24 1c13 0 23 9.5 23 22.3S37 45.6 24 45.6c-2.3 0-4.6-.3-6.7-.9-.4-.1-.8-.1-1.2.1l-4.6 2c-1.1.6-2.5-.3-2.5-1.6l-.1-4.1c0-.5-.2-1-.6-1.3C3.7 35.8 1 30 1 23.3 1 10.5 11 1 24 1z"
                            : "M36.2 16.7L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5 .9l-6.8 10.7c-.7 1 .6 2.2 1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6 1.2 3.9.8 5-.9l6.8-10.7c.6-1.1-.7-2.2-1.7-1.5zM24 1C11 1 1 10.5 1 23.3 1 30 3.7 35.8 8.2 39.8c.4.3.6.8.6 1.3l.2 4.1c0 1 .9 1.8 1.8 1.8.2 0 .5 0 .7-.2l4.6-2c.2-.1.5-.2.7-.2.2 0 .3 0 .5.1 2.1.6 4.3.9 6.7.9 13 0 23-9.5 23-22.3S37 1 24 1zm0 41.6c-2 0-4-.3-5.9-.8-.4-.1-.8-.2-1.3-.2-.7 0-1.3.1-2 .4l-3 1.3V41c0-1.3-.6-2.5-1.6-3.4C6.2 34 4 28.9 4 23.3 4 12.3 12.6 4 24 4s20 8.3 20 19.3-8.6 19.3-20 19.3z"
                        }
                      ></path>
                    </svg>
                  </Link>
                </OverlayTrigger>
              </div>
              <div className="nav-right-item">
                <AddPostModel path={path} />
              </div>

              <div className="nav-right-item">
                <OverlayTrigger
                  placement="bottom-start"
                  overlay={<Tooltip>Discover</Tooltip>}
                >
                  <Link to="/discover">
                    <svg
                      aria-label="Find People"
                      className="_8-yf5 "
                      color="#262626"
                      fill="#262626"
                      height="22"
                      role="img"
                      viewBox="0 0 48 48"
                      width="22"
                    >
                      {path !== "explore" && (
                        <path
                          clipRule="evenodd"
                          d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
                          fillRule="evenodd"
                        ></path>
                      )}
                      {path !== "explore" && (
                        <path
                          clipRule="evenodd"
                          d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
                          fillRule="evenodd"
                        ></path>
                      )}
                    </svg>
                  </Link>
                </OverlayTrigger>
              </div>
              <div className="nav-right-item">
                <Dropdown align="end" className="position-relative">
                  <Dropdown.Toggle as={CustomToggleNotify}></Dropdown.Toggle>
                  <NotifyModal />
                </Dropdown>
              </div>
              <div className="nav-right-item">
                <div className="nav-right-item-avatar">
                  <img
                    className="avatar"
                    src={user?.avatar}
                    width="30"
                    height="30"
                    alt=""
                  />
                  <div className="nav-right-item-dropdown">
                    <ul>
                      <li>
                        <Link to={`/profile/${user.slug}`}>
                          <svg
                            aria-label="Profile"
                            className="_8-yf5 "
                            color="#262626"
                            fill="#262626"
                            height="16"
                            role="img"
                            viewBox="0 0 32 32"
                            width="16"
                          >
                            <path d="M16 0C7.2 0 0 7.1 0 16c0 4.8 2.1 9.1 5.5 12l.3.3C8.5 30.6 12.1 32 16 32s7.5-1.4 10.2-3.7l.3-.3c3.4-3 5.5-7.2 5.5-12 0-8.9-7.2-16-16-16zm0 29c-2.8 0-5.3-.9-7.5-2.4.5-.9.9-1.3 1.4-1.8.7-.5 1.5-.8 2.4-.8h7.2c.9 0 1.7.3 2.4.8.5.4.9.8 1.4 1.8-2 1.5-4.5 2.4-7.3 2.4zm9.7-4.4c-.5-.9-1.1-1.5-1.9-2.1-1.2-.9-2.7-1.4-4.2-1.4h-7.2c-1.5 0-3 .5-4.2 1.4-.8.6-1.4 1.2-1.9 2.1C4.2 22.3 3 19.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13c0 3.3-1.2 6.3-3.3 8.6zM16 5.7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path>
                          </svg>
                          <span>Profile</span>
                        </Link>
                      </li>
                      <div className="uppper"></div>
                      <li>
                        <Link to="/">
                          <svg
                            aria-label="Saved"
                            className="_8-yf5 "
                            color="#262626"
                            fill="#262626"
                            height="16"
                            role="img"
                            viewBox="0 0 32 32"
                            width="16"
                          >
                            <path d="M28.7 32c-.4 0-.8-.2-1.1-.4L16 19.9 4.4 31.6c-.4.4-1.1.6-1.6.3-.6-.2-.9-.8-.9-1.4v-29C1.8.7 2.5 0 3.3 0h25.4c.8 0 1.5.7 1.5 1.5v29c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM4.8 3v23.9l9.4-9.4c.9-.9 2.6-.9 3.5 0l9.4 9.4V3H4.8z"></path>
                          </svg>
                          <span>Saved</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <svg
                            aria-label="Settings"
                            className="_8-yf5 "
                            color="#262626"
                            fill="#262626"
                            height="16"
                            role="img"
                            viewBox="0 0 32 32"
                            width="16"
                          >
                            <path d="M31.2 13.4l-1.4-.7c-.1 0-.2-.1-.2-.2v-.2c-.3-1.1-.7-2.1-1.3-3.1v-.1l-.2-.1v-.3l.5-1.5c.2-.5 0-1.1-.4-1.5l-1.9-1.9c-.4-.4-1-.5-1.5-.4l-1.5.5H23l-.1-.1h-.1c-1-.5-2-1-3.1-1.3h-.2c-.1 0-.1-.1-.2-.2L18.6.9c-.2-.5-.7-.9-1.2-.9h-2.7c-.5 0-1 .3-1.3.8l-.7 1.4c0 .1-.1.2-.2.2h-.2c-1.1.3-2.1.7-3.1 1.3h-.1l-.1.2h-.3l-1.5-.5c-.5-.2-1.1 0-1.5.4L3.8 5.7c-.4.4-.5 1-.4 1.5l.5 1.5v.5c-.5 1-1 2-1.3 3.1v.2c0 .1-.1.1-.2.2l-1.4.7c-.6.2-1 .7-1 1.2v2.7c0 .5.3 1 .8 1.3l1.4.7c.1 0 .2.1.2.2v.2c.3 1.1.7 2.1 1.3 3.1v.1l.2.1v.3l-.5 1.5c-.2.5 0 1.1.4 1.5l1.9 1.9c.3.3.6.4 1 .4.2 0 .3 0 .5-.1l1.5-.5H9l.1.1h.1c1 .5 2 1 3.1 1.3h.2c.1 0 .1.1.2.2l.7 1.4c.2.5.7.8 1.3.8h2.7c.5 0 1-.3 1.3-.8l.7-1.4c0-.1.1-.2.2-.2h.2c1.1-.3 2.1-.7 3.1-1.3h.1l.1-.1h.3l1.5.5c.1 0 .3.1.5.1.4 0 .7-.1 1-.4l1.9-1.9c.4-.4.5-1 .4-1.5l-.5-1.5V23l.1-.1v-.1c.5-1 1-2 1.3-3.1v-.2c0-.1.1-.1.2-.2l1.4-.7c.5-.2.8-.7.8-1.3v-2.7c0-.5-.4-1-.8-1.2zM16 27.1c-6.1 0-11.1-5-11.1-11.1S9.9 4.9 16 4.9s11.1 5 11.1 11.1-5 11.1-11.1 11.1z"></path>
                          </svg>
                          <span>Settings</span>
                        </Link>
                      </li>
                      <li
                        onClick={() =>
                          dispatch(
                            changeThemeAction({
                              theme: theme === "light" ? "dark" : "light",
                            })
                          )
                        }
                      >
                        <Link to="/">
                          <svg
                            aria-label="Switch Accounts"
                            className="_8-yf5 "
                            color="#262626"
                            fill="#262626"
                            height="16"
                            role="img"
                            viewBox="0 0 32 32"
                            width="16"
                          >
                            <path d="M10.3 10.7c0-.8-.7-1.5-1.5-1.5H4.9C7.2 5.4 11.4 3 16 3c3.6 0 7 1.5 9.5 4.1.5.6 1.5.6 2.1.1.6-.6.6-1.5.1-2.1-3-3.2-7.3-5-11.7-5C10.7 0 6 2.5 3 6.7V3.5C3 2.7 2.3 2 1.5 2S0 2.7 0 3.5v7.2c0 .8.7 1.5 1.5 1.5h7.3c.8 0 1.5-.6 1.5-1.5zm20.2 9.1h-7.2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h3.8C24.8 26.6 20.6 29 16 29c-3.6 0-7-1.5-9.5-4.1-.5-.6-1.5-.6-2.1-.1-.6.6-.6 1.5-.1 2.1 3 3.2 7.3 5 11.7 5 5.3 0 10-2.5 13-6.7v3.2c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-7.2c0-.8-.7-1.4-1.5-1.4z"></path>
                          </svg>
                          <span>Swich Theme</span>
                        </Link>
                      </li>
                      <li className="logout" onClick={handleLogout}>
                        Log out
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Nav>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
