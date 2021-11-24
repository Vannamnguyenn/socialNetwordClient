import React, { useState } from "react";
import ItemComment from "./ItemComment";

const RenderComment = ({ post, comment, reply }) => {
  const [showReply, setShowReply] = useState(false);
  return (
    <>
      <ItemComment comment={comment} post={post} />
      {reply &&
        showReply &&
        reply.map((comment, index) => (
          <ItemComment key={index} comment={comment} post={post} />
        ))}
      {reply.length > 0 && (
        <p
          className="text-end"
          style={{ marginBottom: "10px", lineHeight: "15px" }}
        >
          <b
            style={{ cursor: "pointer" }}
            onClick={() => setShowReply((i) => !i)}
          >
            {showReply ? "Hiden" : "View"} replies ({reply.length})
          </b>
        </p>
      )}
    </>
  );
};

export default RenderComment;
