import React from "react";
import Container from "react-bootstrap/Container";
import FriendNews from "../components/FriendNews/FriendNews";
import Posts from "../components/Posts/Posts";
import SuggestFollow from "../components/SuggestFollow/SuggestFollow";
import "../style/home.scss";

const Home = () => {
  return (
    <div className="index">
      <Container className="index-wrapper">
        <div className="index-left">
          <FriendNews />
          <Posts />
        </div>
        <div className="index-right">
          <SuggestFollow />
        </div>
      </Container>
    </div>
  );
};

export default Home;
