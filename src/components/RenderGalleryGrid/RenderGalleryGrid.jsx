import React from "react";
import { Link } from "react-router-dom";
import "./renderGalleryGrid.scss";

const RenderGalleryGrid = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="col-lg-3 col-sm-6 pb-4">
          <div className="contain-media-item">
            <Link to={`/${post._id}`}>
              <div className="contain-media-item-info">
                <div>
                  <span>
                    {post.likes.length}
                    <i className="far fa-heart"></i>
                  </span>
                  <span>
                    {post.comments.length}
                    <i className="far fa-comment"></i>
                  </span>
                </div>
              </div>
            </Link>

            {post.images[0].url.match(/video/i) ? (
              <video
                src={post.images[0].url}
                className="d-block w-100"
                height="300px"
              ></video>
            ) : (
              <img
                src={post.images[0].url}
                className="d-block w-100"
                height="300px"
                alt=""
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default RenderGalleryGrid;
