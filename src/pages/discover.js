import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import postAPI from "../api/postAPI";
import LoadingImg from "../assets/images/loading.gif";
import RenderGalleryGrid from "../components/RenderGalleryGrid/RenderGalleryGrid";

const Discover = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await postAPI.getDiscover();
      setLoading(false);
      setPosts(response.data.posts);
    })();
  }, []);
  return (
    <Container className="mt-5 mb-4 text-center">
      {loading && <img src={LoadingImg} width="100" height="100" alt="" />}
      {!loading && (
        <div>
          <div className="row">
            <RenderGalleryGrid posts={posts} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Discover;
