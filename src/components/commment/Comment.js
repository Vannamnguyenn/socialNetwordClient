import React from "react";
import InputComment from "./InputComment";
import BodyComment from "./BodyComment";
import "./comment.scss";

const Comment = ({ post }) => {
  return (
    <>
      <BodyComment post={post} />
      <InputComment post={post} />
    </>
  );
};

export default Comment;
