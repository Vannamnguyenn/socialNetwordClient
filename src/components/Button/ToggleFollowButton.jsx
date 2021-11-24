import React, { useState } from "react";
import { Button } from "react-bootstrap";
import userAPI from "../../api/userAPI";
import { useDispatch } from "react-redux";
import { UPDATE_FOLLOW } from "../../redux/types/authType";

const ToggleFollowButton = ({ own, user }) => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(() => own.following.includes(user._id));
  const handleToggleFollow = async (id) => {
    if (check) {
      await userAPI.unFollowUser(id);
      dispatch({
        type: UPDATE_FOLLOW,
        payload: {
          id,
        },
      });

      return setCheck(false);
    }
    await userAPI.followUser(id);

    dispatch({
      type: UPDATE_FOLLOW,
      payload: {
        id,
      },
    });
    return setCheck(true);
  };

  return (
    <Button
      size="sm"
      variant={check ? "outline-danger" : "outline-success"}
      onClick={() => handleToggleFollow(user._id)}
    >
      {check ? "UnFollow" : "Follow"}
    </Button>
  );
};

export default ToggleFollowButton;
