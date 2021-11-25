import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import userAPI from "../api/userAPI";
import ToggleFollowButton from "../components/Button/ToggleFollowButton";
import UpdateProfileModal from "../components/Modals/UpdateProfileModal";
import ProfileNav from "../components/Profile/ProfileNav";
import SuggestFollowItem from "../components/SuggestFollow/SuggestFollowItem";
import "../style/profile.scss";
import NotFound from "./notFound";
import LoadingImg from "../assets/images/loading.gif";

const Profile = () => {
  const [profile, setProfile] = useState();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const { params } = useRouteMatch();
  useEffect(() => {
    const fetch = () => {
      (async () => {
        try {
          const res = await userAPI.getUser(params.slug);
          setLoading(false);
          setProfile(res.data.user);
        } catch (error) {}
      })();
    };
    fetch();
  }, [params, user]);
  return (
    <>
      {profile && (
        <div className="profile">
          <div className="container wrapper">
            <div className="profile-header">
              <div className="profile-header-left">
                <img src={profile.avatar} alt="" />
              </div>
              <div className="profile-header-center">
                <div className="profile-header-center-slug">
                  <h3>{profile.slug}</h3>
                  {profile._id === user._id && (
                    <UpdateProfileModal profile={profile} />
                  )}
                  {profile._id !== user._id && (
                    <ToggleFollowButton own={user} user={profile} />
                  )}
                </div>
                <div className="profile-header-center-info">
                  <p>
                    <b>0</b> posts
                  </p>
                  <div className="contain-follow">
                    <p className="follow">
                      <b>{profile?.followers.length}</b> followers
                    </p>
                    <ListGroup className="list-follow">
                      {profile?.followers.map((item, index) => (
                        <SuggestFollowItem key={index} own={user} user={item} />
                      ))}
                    </ListGroup>
                  </div>
                  <div className="contain-follow">
                    <p className="follow">
                      <b>{profile?.following.length}</b> following
                    </p>
                    <ListGroup className="list-follow">
                      {profile?.following.map((item, index) => (
                        <SuggestFollowItem key={index} own={user} user={item} />
                      ))}
                    </ListGroup>
                  </div>
                </div>
                <p className="profile-header-center-name">
                  <b>{profile.fullname}</b>
                </p>
                <p className="profile-header-center-name">{profile?.address}</p>
                <p className="profile-header-center-name">
                  <a
                    href={
                      profile?.website && profile?.website.includes("https")
                        ? profile?.website
                        : "https://" + profile?.website
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {profile?.website}
                  </a>
                </p>
                <p className="profile-header-center-name">{profile?.story}</p>
              </div>
              <div className="profile-header-right"></div>
            </div>
            <div className="profile-body">
              <div className="profile-body-navigate">
                <ProfileNav />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="text-center mt-5 mb-4">
        {loading && <img src={LoadingImg} width="100" height="100" alt="" />}
      </div>
      {!profile && !loading && <NotFound />}
    </>
  );
};

export default Profile;
