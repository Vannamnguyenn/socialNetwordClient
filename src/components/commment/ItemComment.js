import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import CustomToggle from "./CustomToggle";
import InputComment from "./InputComment";
import { Link } from "react-router-dom";
import {
  deleteComment,
  toggleLikeComment,
} from "../../redux/actions/commentAction";

const ItemComment = ({ comment, post }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const checkRole = user._id === comment.user._id || user._id === post.userID;
  const [reply, setReply] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment._id, post));
  };

  const handleToggleLike = () => {
    dispatch(toggleLikeComment(comment._id, post));
  };

  return (
    <>
      <div
        className="item-comment"
        style={comment.reply ? { paddingLeft: "35px" } : {}}
      >
        {comment.isSending && <div className="item-comment-disabled"></div>}
        <div className="item-comment-content">
          <img src={comment.user.avatar} alt="" />
          {!update && (
            <div className="item-comment-content-info">
              <div>
                <b style={{ fontWeight: "500" }}>{comment.user.fullname}</b>
                <div>
                  {comment.tag && comment.tag._id !== user._id && (
                    <Link to={`/profile/${comment.tag.slug}`}>
                      <b>@{comment.tag.fullname}</b>
                    </Link>
                  )}
                  <span>{comment.content}</span>
                </div>
              </div>
              <div className="contain-acion">
                {checkRole && (
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setUpdate(true)}>
                        {" "}
                        <b className="text-warning">Edit</b>{" "}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleDeleteComment}>
                        {" "}
                        <b className="text-danger">Delete</b>{" "}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                {comment.likes.findIndex((u) => u._id === user._id) !== -1 ? (
                  <i onClick={handleToggleLike} className="fas fa-heart"></i>
                ) : (
                  <i
                    onClick={handleToggleLike}
                    class="far fa-heart"
                    style={{ color: "#555" }}
                  ></i>
                )}
              </div>
              <div className="item-comment-content-info-bottom">
                <span>{format(comment.createdAt)}</span>
                <span>{comment.likes.length} Likes</span>
                <span onClick={() => setReply((i) => !i)}>
                  {reply ? "Hidden" : "Reply"}
                </span>
              </div>
            </div>
          )}
          {update && (
            <div className="comment-update">
              <InputComment
                post={post}
                commentUpdate={comment}
                setUpdate={setUpdate}
              />
              <span onClick={() => setUpdate(false)} class="text-danger">
                Cancel
              </span>
            </div>
          )}
        </div>
      </div>
      {reply && (
        <div className="comment-reply">
          <InputComment
            reply={comment.reply || comment._id}
            tag={comment.user}
            post={post}
          />
        </div>
      )}
    </>
  );
};

export default ItemComment;
