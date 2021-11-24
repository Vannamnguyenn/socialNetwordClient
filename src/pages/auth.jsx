import React, { memo } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ForGotPassword from "../components/Form/ForgotPassword/ForGotPassword";
import LoginForm from "../components/Form/Login/LoginForm";
import RegisterForm from "../components/Form/Register/RegisterForm";
import ResetPassword from "../components/Form/ResetPassword/ResetPassword";
import {
  loginFacebookAction,
  loginGoogleAction,
} from "../redux/actions/authAction";
import { toastAction } from "../redux/actions/toastAction";
import "../style/auth.scss";

const Auth = ({ page }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) history.push({ pathname: "/" });
  const responseGoogle = async (response) => {
    if (!response.tokenId) return;
    const payload = { tokenId: response.tokenId };
    const data = await dispatch(loginGoogleAction(payload));
    dispatch(toastAction(data));
  };
  const responseFacebook = async (response) => {
    if (!response.userID) return;
    const data = await dispatch(
      loginFacebookAction({
        accessToken: response.accessToken,
        userID: response.userID,
      })
    );
    dispatch(toastAction(data));
  };
  return (
    <>
      <div className="home text-center">
        <div className="home-wrapper">
          <div className="home-body row">
            <div className="home-body-left col-lg-6">
              <div className="home-image-background">
                <img
                  src="https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg"
                  alt=""
                />
              </div>
            </div>
            <div
              className={`home-body-right col-lg-6 `}
              style={page === "register" ? { padding: "0" } : {}}
            >
              <div className="home-body-right-wapper">
                <div className="top">
                  <h2>Instagram</h2>
                  {page === "login" && <LoginForm />}
                  {page === "register" && <RegisterForm />}
                  {page === "forgot-password" && <ForGotPassword />}
                  {page?.includes("reset-password") && <ResetPassword />}
                  <div className="top-or">
                    <span>Or Login With</span>
                  </div>

                  <div className="login_social">
                    <div className="col-6">
                      <GoogleLogin
                        clientId="811883403522-ok9ddq00sapdtv91199e8gn5s5m9fjcc.apps.googleusercontent.com"
                        buttonText="Google"
                        onSuccess={responseGoogle}
                        autoLoad={false}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </div>
                    <div className="col-6">
                      <FacebookLogin
                        appId="432420964913046"
                        autoLoad={false}
                        textButton="Facebook"
                        fields="name,email,picture"
                        cssClass="my-facebook-button-class"
                        icon="fa-facebook"
                        callback={responseFacebook}
                      />
                    </div>
                  </div>
                  <Link to="/forgot-password" className="forgot_pass">
                    Forgot password ?
                  </Link>
                </div>
                <div className="bottom">
                  <p className="no_account">
                    {page === "login" ? (
                      <>
                        Don't have an account ?
                        <Link to="/register"> Register</Link>
                      </>
                    ) : (
                      <>
                        Have already an account ?
                        <Link to="/login"> Log In</Link>
                      </>
                    )}
                  </p>
                </div>
                <div className="getApp">
                  <p>Get the app</p>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="col-6 text-end">
                      <img
                        width="136"
                        src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
                        alt=""
                      />
                    </div>
                    <div className="col-6 text-start">
                      <img
                        width="136"
                        src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-bottom"></div>
        </div>
      </div>
    </>
  );
};

export default memo(Auth);
