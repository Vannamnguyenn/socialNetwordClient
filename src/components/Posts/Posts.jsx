import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingImage from "../../assets/images/loading.gif";
import { getPosts } from "../../redux/actions/postAction";
import Post from "./Post";
import "./posts.scss";

const Posts = () => {
  const { posts, page, results, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getPosts({ page: 1, limit: 5 })), [dispatch]);
  const handleLoadMore = () => {
    dispatch(getPosts({ page: page + 1, limit: 5 }));
  };
  return (
    <div className="posts-wrapper">
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
      {loading && (
        <div className="text-center">
          <img width="40" height="40" src={LoadingImage} alt="" />
        </div>
      )}
      {results >= page * 5 && results !== 0 && !loading && (
        <div className="text-center">
          <Button size="sm" variant="secondary" onClick={handleLoadMore}>
            Load more
          </Button>
        </div>
      )}
      {results === 0 && !loading && posts.length === 0 && (
        <h1 className="text-center mt-5 mb-4 text-muted">No posts</h1>
      )}
    </div>
  );
};

export default Posts;
