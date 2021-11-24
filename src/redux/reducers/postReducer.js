import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  UPDATE_POST,
  POST_LOADING,
} from "../types/postTypes";

const initialState = {
  posts: [],
  loading: false,
  page: 1,
  results: 0,
};

const postReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case POST_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case GET_POST:
      return {
        ...state,
        posts: payload.posts,
        page: payload.page,
        results: payload.results,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload.post, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload.id),
      };
    case UPDATE_POST:
      let newPosts = [...state.posts];
      const index = newPosts.findIndex((post) => post._id === payload.post._id);
      newPosts[index] = payload.post;
      return {
        ...state,
        posts: newPosts,
      };
    default:
      return state;
  }
};

export default postReducer;
