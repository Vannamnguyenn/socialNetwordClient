import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import postAPI from "../api/postAPI";
import LoadingImg from "../assets/images/loading.gif";
import Post from "../components/Posts/Post";
import { GlobalTypes } from "../redux/types/globalTypes";

const PostDetails = () => {
  const { params } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const post = useSelector((state) => state.postDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await postAPI.getPost(params.id);
      setLoading(false);
      dispatch({
        type: GlobalTypes.GET_POST_DETAILS,
        payload: {
          post: res.data.post,
        },
      });
    })();
  }, [params.id, dispatch]);
  return (
    <>
      <Container
        className="mt-5 mb-4 text-center"
        style={{ minHeight: "calc(100% - 55px)" }}
      >
        {loading && <img src={LoadingImg} width="100" height="100" alt="" />}
      </Container>
      <div
        className="container mt-5 mb-5 ps-2 pe-2"
        style={{ maxWidth: "800px" }}
      >
        {post && !loading && <Post styleImgDetails={true} post={post} />}
      </div>
    </>
  );
};

export default PostDetails;
