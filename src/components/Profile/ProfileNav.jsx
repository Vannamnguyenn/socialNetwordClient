import React from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import MyPosts from "./MyPosts";
import MySaves from "./MySaves";
import Tagges from "./Tagges";

const ProfileNav = () => {
  const { params, url } = useRouteMatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <div className="profile-body-navigate-wrapper">
        <Link to={`${url}`} className="profile-body-navigate-item">
          <i className="fas fa-th"></i>
          <span>POSTS</span>
        </Link>
        {params.slug === user.slug && (
          <Link to={`${url}/saved`} className="profile-body-navigate-item">
            <i className="fas fa-bookmark"></i>
            <span>SAVED</span>
          </Link>
        )}
        <Link to={`${url}/tagged`} className="profile-body-navigate-item">
          <i className="fas fa-id-badge"></i>
          <span>TAGGED</span>
        </Link>
      </div>
      <div className="profile-body-main">
        <Switch>
          <Route path={`${url}`} exact>
            <MyPosts params={params} />
          </Route>
          {params.slug === user.slug && (
            <Route path={`${url}/saved`} component={MySaves} exact />
          )}
          <Route path={`${url}/tagged`} component={Tagges} exact />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default ProfileNav;
