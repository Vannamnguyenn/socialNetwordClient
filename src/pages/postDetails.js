import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import postAPI from "../api/postAPI";
import Post from "../components/Posts/Post";
import { GlobalTypes } from "../redux/types/globalTypes";

const PostDetails = () => {
  const { params } = useRouteMatch();
  const post = useSelector((state) => state.postDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await postAPI.getPost(params.id);
      dispatch({
        type: GlobalTypes.GET_POST_DETAILS,
        payload: {
          post: res.data.post,
        },
      });
    })();
  }, [params.id, dispatch]);
  return (
    <div
      className="container mt-5 mb-5 ps-2 pe-2"
      style={{ maxWidth: "800px" }}
    >
      {post && <Post post={post} />}
    </div>
  );
};

export default PostDetails;
