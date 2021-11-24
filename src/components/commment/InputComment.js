import React, { useEffect, useState } from "react";
import EmotionPicker from "../EmotionPicker/EmotionPicker";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  updateComment,
} from "../../redux/actions/commentAction";
import { Link } from "react-router-dom";

const InputComment = ({ post, reply, tag, commentUpdate, setUpdate }) => {
  const [content, setContent] = useState("");
  const [showPinker, setShowPicker] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleConentChange = (e) => {
    if (content.length > 300) return;
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentUpdate) {
      dispatch(updateComment(commentUpdate._id, { content }, post));
      setUpdate(false);
    } else {
      const payload = {
        content,
        postID: post._id,
        postUserID: post.user._id,
        user: user,
        isSending: true,
        likes: [],
        createdAt: new Date().toISOString(),
      };
      if (reply) payload.reply = reply;
      if (tag) payload.tag = tag;
      dispatch(createComment(payload, post));
      setContent("");
    }
  };

  useEffect(() => {
    if (commentUpdate) setContent(commentUpdate?.content);
  }, [post.comments, commentUpdate]);

  return (
    <>
      {tag && (
        <Link to={`/profile/${tag?.slug}`}>
          <b style={{ paddingLeft: "0px", marginBottom: "5px" }}>
            @{tag.fullname}
          </b>
        </Link>
      )}
      <form action="" onSubmit={handleSubmit}>
        <div className="post-bottom-addcomment">
          <div
            className="post-bottom-addcomment-left"
            onClick={() => setShowPicker(true)}
          >
            <svg
              aria-label="Emoji"
              className="_8-yf5 "
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 48 48"
              width="24"
            >
              <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
              <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
            </svg>
            <EmotionPicker
              show={showPinker}
              onHide={setShowPicker}
              callback={setContent}
              content={content}
            />
          </div>

          <div className="post-bottom-addcomment-center">
            <input
              onChange={handleConentChange}
              type="text"
              placeholder={
                commentUpdate?.content ? "Update value ..." : "Add comment ..."
              }
              value={content}
            />
            <span className="text-muted">{content.length}/300</span>
          </div>

          <div className="post-bottom-addcomment-right" onClick={handleSubmit}>
            <b>{commentUpdate?.content ? "Update" : "Post"}</b>
          </div>
          <input type="submit" style={{ display: "none" }} />
        </div>
      </form>
    </>
  );
};

export default InputComment;
