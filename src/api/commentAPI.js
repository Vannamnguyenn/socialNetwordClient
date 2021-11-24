import baseAPI from "./baseAPI";

const commentAPI = {
  createComment(payload) {
    return baseAPI.post("/comment/create", payload);
  },

  updateComment(id, payload) {
    return baseAPI.patch(`/comment/update/${id}`, payload);
  },

  deleteComment(id) {
    return baseAPI.delete(`/comment/delete/${id}`);
  },

  toggleLikeComment(id) {
    return baseAPI.patch(`/comment/toggle-like/${id}`);
  },
};

export default commentAPI;
