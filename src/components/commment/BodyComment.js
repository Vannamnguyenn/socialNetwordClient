import React, { useEffect, useMemo, useState } from "react";
import RenderComment from "./RenderComment";

const BodyComment = ({ post }) => {
  const [commentRep, setCommentRep] = useState([]);
  const [commentMain, setCommentMain] = useState([]);
  const [next, setNext] = useState(1);

  const commentNotRep = useMemo(() => {
    return post.comments.filter((comment) => !comment.reply);
  }, [post.comments]);
  useEffect(() => {
    setCommentMain(commentNotRep.slice(0, next));
  }, [post.comments, next, commentNotRep]);
  useEffect(() => {
    const comment = post.comments.filter((comment) => comment.reply);
    setCommentRep(comment);
  }, [post.comments]);
  return (
    <div className="body-comment">
      {commentMain.map((comment, index) => (
        <RenderComment
          key={index}
          comment={comment}
          post={post}
          reply={commentRep.filter((c) => c.reply === comment._id)}
        />
      ))}

      {commentNotRep.length > 1 && commentNotRep.length > next && (
        <div className="text-center">
          <button
            onClick={() => setNext((next) => next + 5)}
            style={{ background: "transparent", border: "none" }}
          >
            <svg
              aria-label="Load more comments"
              className="_8-yf5 "
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <circle
                cx="12.008"
                cy="12"
                fill="none"
                r="11.25"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></circle>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                x1="5.872"
                x2="18.144"
                y1="12"
                y2="12"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                x1="12.008"
                x2="12.008"
                y1="5.864"
                y2="18.136"
              ></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default BodyComment;
