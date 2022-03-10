import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const AdminRouter = ({ component: Component, ...rest }) => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.global);

  if (isLoading) return <Loading />;
  return (
    <Route
      {...rest}
      render={(props) =>
        user && user?.role !== 0 ? (
          <React.Fragment>
            <div
              id="main"
              className={theme === "light" ? "theme-light" : "theme-dark"}
            >
              <Component {...rest} {...props} />
            </div>
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AdminRouter;
