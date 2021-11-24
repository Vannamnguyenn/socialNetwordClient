import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SuggestFollowItem from "./SuggestFollowItem";
import "./suggestFollow.scss";
import userAPI from "../../api/userAPI";
import { Button } from "react-bootstrap";

const SuggestFollow = () => {
  const [suggests, setSuggests] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await userAPI.getSuggestUser();
      setSuggests(res.data.users);
    })();
  }, [reload]);

  return (
    <div className="suggest-follow">
      <div className="suggest-follow-top">
        <div className="suggest-follow-myinfo">
          <img src={user?.avatar} alt="" />
          <div className="suggest-follow-nyinfo-center">
            <Link to="/">
              <b>{user?.slug}</b>
            </Link>
            <p>{user?.fullname}</p>
          </div>
          <Button size="sm" variant="outline-secondary">
            Switch
          </Button>
        </div>
      </div>
      <div className="suggest-follow-body">
        <div className="suggest-follow-title">
          <p>Suggestion For You</p>
          <span onClick={() => setReload((i) => !i)}>
            <i className="fas fa-sync-alt"></i>
          </span>
        </div>
        <ul className="suggest-follow-list">
          {suggests.map((item) => (
            <SuggestFollowItem key={item._id} own={user} user={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuggestFollow;
