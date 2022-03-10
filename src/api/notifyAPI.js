import baseAPI from "./baseAPI";

const notifyAPI = {
  create(payload) {
    return baseAPI.post("/notify/create", payload);
  },
  delete(payload) {
    return baseAPI.delete("/notify/delete", {
      data: payload,
    });
  },
  deleteAll() {
    return baseAPI.patch("/notify/delete-all");
  },
  getNotifies() {
    return baseAPI.get("/notify");
  },
  changeIsRead(id) {
    return baseAPI.patch(`/notify/change-is-read/${id}`);
  },
};

export default notifyAPI;
