import postAPI from "../../api/postAPI";
import { uploadImage } from "../../until/uploadImage";
import { UPDATE_PROFILE } from "../types/authType";
import {
  DELETE_POST,
  GET_POST,
  POST_LOADING,
  UPDATE_POST,
  ADD_POST,
} from "../types/postTypes";
import { LoadingAction } from "./loadingAction";
import { toastAction } from "./toastAction";

export const getPosts =
  ({ page = 1, limit = 5 }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_LOADING,
        payload: true,
      });
      const response = await postAPI.getPosts({ limit: page * limit });

      dispatch({
        type: GET_POST,
        payload: {
          posts: response.data.posts,
          results: response.data.results,
          page,
        },
      });
    } catch (error) {
      dispatch({
        type: POST_LOADING,
        payload: false,
      });
      return error;
    }
  };

export const createPostAction = (content, files) => async (dispatch) => {
  try {
    dispatch(LoadingAction(true));
    const images = await uploadImage(files);
    const response = await postAPI.createPost({ content, images });
    dispatch(LoadingAction(false));
    dispatch(toastAction(response.data));
    dispatch({
      type: ADD_POST,
      payload: {
        post: response.data.post,
      },
    });
  } catch (error) {
    console.error(error);
    dispatch(LoadingAction(false));
    dispatch(toastAction(error));
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch(LoadingAction(true));
    const res = await postAPI.deletePost(id);
    dispatch(LoadingAction(false));
    dispatch(toastAction(res.data));
    dispatch({
      type: DELETE_POST,
      payload: {
        id,
      },
    });
  } catch (error) {
    dispatch(LoadingAction(false));
    dispatch(toastAction(error));
  }
};

export const updatePost =
  (id, { content, newImages, oldPost }) =>
  async (dispatch) => {
    var imageUpload = [];
    try {
      dispatch(LoadingAction(true));
      const imageFiles = newImages.filter((img) => !img.url);
      const imageURL = newImages.filter((img) => img.url);

      if (
        imageFiles.length === 0 &&
        content === oldPost.content &&
        newImages.length === oldPost.images.length
      ) {
        return dispatch(LoadingAction(false));
      }
      if (imageFiles.length > 0) imageUpload = await uploadImage(imageFiles);
      const res = await postAPI.updatePost(id, {
        content,
        images: [...imageURL, ...imageUpload],
      });
      dispatch(LoadingAction(false));
      dispatch(toastAction(res.data));
      dispatch({
        type: UPDATE_POST,
        payload: {
          post: res.data.post,
          id,
        },
      });
      return res.data;
    } catch (error) {
      dispatch(LoadingAction(false));
      dispatch(toastAction(error));
      return error;
    }
  };

export const toggleLikePost = (id, user, post) => async (dispatch) => {
  try {
    const index = [...post.likes].findIndex((u) => u._id === user._id);
    let newLikes = [...post.likes];
    if (index !== -1) {
      newLikes.splice(index, 1);
    } else {
      newLikes.unshift(user);
    }
    dispatch({
      type: UPDATE_POST,
      payload: {
        post: {
          ...post,
          likes: newLikes,
        },
        id,
      },
    });
    const res = await postAPI.likePost(id);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const toggleSavedPost = (id, user, post) => async (dispatch) => {
  try {
    let newSaved = [...user.saved];
    const check = newSaved.includes(post._id);

    if (check) {
      newSaved = newSaved.filter((p) => p !== post._id);
    } else {
      newSaved.push(post._id);
    }

    dispatch({
      type: UPDATE_PROFILE,
      payload: {
        user: {
          ...user,
          saved: newSaved,
        },
      },
    });
    const res = await postAPI.savePost(id);
    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
