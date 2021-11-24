import React, { useEffect, useState } from "react";
import postAPI from "../../api/postAPI";
import LoadingImg from "../../assets/images/loading.gif";
import RenderGalleryGrid from "../RenderGalleryGrid/RenderGalleryGrid";

const MyPosts = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await postAPI.getUserPost(params.slug);
      setLoading(false);
      setPosts(response.data.posts);
    })();
  }, [params.slug]);
  return (
    <div className="text-center mt-5 mb-4">
      {loading && <img src={LoadingImg} width="100" height="100" alt="" />}
      {!loading && (
        <div>
          <div className="row">
            <RenderGalleryGrid posts={posts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
