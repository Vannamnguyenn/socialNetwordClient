import React from "react";
import { Link } from "react-router-dom";
import ToggleFollowButton from "../Button/ToggleFollowButton";
import "./suggestFollowItem.scss";

const SuggestFollowItem = ({ own, user }) => {
  const check = own._id !== user._id;

  return (
    <li className="suggest-item">
      <div className="suggest-item-main">
        <img src={user.avatar} alt="" />
        <div>
          <Link to={`/profile/${user.slug}`}>
            <p>
              <b>{user.slug}</b>
            </p>
          </Link>
          <span>
            {own.following.includes(user._id)
              ? "following"
              : !check
              ? "You"
              : "Suggest for you"}
          </span>
        </div>
      </div>
      {check && <ToggleFollowButton own={own} user={user} />}
    </li>
  );
};

export default SuggestFollowItem;
