import { UPDATE_POST } from "../types/postTypes";
import commentAPI from "../../api/commentAPI";

export const createComment = (payload, post, socket) => async (dispatch) => {
  const newComments = [...post.comments, payload];
  const newPost = { ...post, comments: newComments };
  dispatch({
    type: UPDATE_POST,
    payload: {
      post: newPost,
    },
  });
  try {
    const res = await commentAPI.createComment(payload);
    dispatch({
      type: UPDATE_POST,
      payload: {
        post: {
          ...post,
          comments: [...post.comments, res.data.comment],
        },
      },
    });
    socket.emit("commentPost", {
      ...post,
      comments: [...post.comments, res.data.comment],
    });
  } catch (error) {
    dispatch({
      type: UPDATE_POST,
      payload: {
        post,
      },
    });
  }
};

export const deleteComment = (id, post, socket) => async (dispatch) => {
  try {
    const newComments = [...post.comments].filter(
      (c) => c._id !== id && c.reply !== id
    );
    dispatch({
      type: UPDATE_POST,
      payload: {
        post: {
          ...post,
          comments: newComments,
        },
      },
    });
    await commentAPI.deleteComment(id);
    socket.emit("commentPost", {
      ...post,
      comments: newComments,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_POST,
      payload: {
        post,
      },
    });
  }
};

export const updateComment =
  (id, payload, post, socket) => async (dispatch) => {
    try {
      const response = await commentAPI.updateComment(id, payload, post);
      const newComments = [...post.comments].map((comment) => {
        if (comment._id === id) return response.data.comment;
        return comment;
      });
      dispatch({
        type: UPDATE_POST,
        payload: {
          post: {
            ...post,
            comments: newComments,
          },
        },
      });
      socket.emit("commentPost", {
        ...post,
        comments: newComments,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_POST,
        payload: {
          post,
        },
      });
    }
  };

export const toggleLikeComment =
  (id, post, user, socket) => async (dispatch) => {
    try {
      const newComments = [...post.comments].map((comment) => {
        if (comment._id === id) {
          const index = comment.likes.findIndex((u) => u._id === user._id);
          if (index !== -1) {
            comment.likes.splice(index, 1);
          } else {
            comment.likes.unshift(user);
          }
          return comment;
        }
        return comment;
      });
      dispatch({
        type: UPDATE_POST,
        payload: {
          post: {
            ...post,
            comments: newComments,
          },
        },
      });
      await commentAPI.toggleLikeComment(id);
      socket.emit("commentPost", {
        ...post,
        comments: newComments,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_POST,
        payload: {
          post,
        },
      });
    }
  };
