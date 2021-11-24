import { UPDATE_POST } from "../types/postTypes";
import commentAPI from "../../api/commentAPI";

export const createComment = (payload, post) => async (dispatch) => {
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
  } catch (error) {
    dispatch({
      type: UPDATE_POST,
      payload: {
        post,
      },
    });
  }
};

export const deleteComment = (id, post) => async (dispatch) => {
  try {
    await commentAPI.deleteComment(id);
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
  } catch (error) {
    dispatch({
      type: UPDATE_POST,
      payload: {
        post,
      },
    });
  }
};

export const updateComment = (id, payload, post) => async (dispatch) => {
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
  } catch (error) {
    dispatch({
      type: UPDATE_POST,
      payload: {
        post,
      },
    });
  }
};

export const toggleLikeComment = (id, post) => async (dispatch) => {
  try {
    const response = await commentAPI.toggleLikeComment(id);
    const newComments = [...post.comments].map((comment) => {
      if (comment._id === id) {
        return response.data.comment;
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
  } catch (error) {
    dispatch({
      type: UPDATE_POST,
      payload: {
        post,
      },
    });
  }
};
