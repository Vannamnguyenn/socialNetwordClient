import baseAPI from "./baseAPI";

const userAPI = {
  getSuggestUser() {
    return baseAPI.get("/user/suggest");
  },
  followUser(id) {
    return baseAPI.patch(`/user/follow/${id}`);
  },
  unFollowUser(id) {
    return baseAPI.patch(`/user/unfollow/${id}`);
  },
  getUser(slug) {
    return baseAPI.get(`/user/get-user/${slug}`);
  },
  searchUser(search) {
    return baseAPI.get(`/user/search`, {
      params: {
        search,
      },
    });
  },
  updateUser(payload) {
    return baseAPI.put("/user/update", payload);
  },
};

export default userAPI;
