import baseAPI from "./baseAPI";

const postAPI = {
  createPost(payload) {
    return baseAPI.post("/post/create", payload);
  },
  updatePost(id, payload) {
    return baseAPI.put(`/post/update/${id}`, payload);
  },
  deletePost(id) {
    return baseAPI.delete(`/post/delete/${id}`);
  },
  likePost(id) {
    return baseAPI.patch(`/post/liked/${id}`);
  },
  getDiscover() {
    return baseAPI.get(`/post/discover`);
  },
  savePost(id) {
    return baseAPI.patch(`/post/saved/${id}`);
  },
  getPosts(params) {
    return baseAPI.get(`/post`, {
      params,
    });
  },
  getSavedPost() {
    return baseAPI.get("/post/saved");
  },
  getPost(id) {
    return baseAPI.get(`/post/${id}`);
  },
  getUserPost(slug) {
    return baseAPI.get(`/post/user/${slug}`);
  },
};

export default postAPI;
