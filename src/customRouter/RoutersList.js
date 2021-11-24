import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Auth from "../pages/auth";
import Discover from "../pages/discover";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import PostDetails from "../pages/postDetails";
import Profile from "../pages/profile";
import { loadingUser } from "../redux/actions/authAction";
import ProtectedRouter from "./ProtectedRouter";

const RoutersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingUser());
  }, [dispatch]);

  return (
    <Switch>
      <Route
        exact
        path="/login"
        render={(props) => <Auth {...props} page="login" />}
      />
      <Route
        exact
        path="/register"
        render={(props) => <Auth {...props} page="register" />}
      />
      <Route
        exact
        path="/forgot-password"
        render={(props) => <Auth {...props} page="forgot-password" />}
      />
      <Route
        exact
        path="/reset-password/:token"
        render={(props) => <Auth {...props} page="reset-password" />}
      />
      <ProtectedRouter path="/profile/:slug" component={Profile} />
      <ProtectedRouter path="/discover" component={Discover} />
      <ProtectedRouter path="/:id" component={PostDetails} />
      <ProtectedRouter path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default RoutersList;
