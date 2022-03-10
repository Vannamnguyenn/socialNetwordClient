import baseAPI from "./baseAPI";

const messageAPI = {
  createConversation(payload) {
    return baseAPI.post("/chat/conversation", payload);
  },
  createMessage(payload) {
    return baseAPI.post("/chat/message", payload);
  },
  deleteConversation(id) {
    return baseAPI.delete(`/chat/conversation/${id}`);
  },
  deleteMessage(id) {
    return baseAPI.delete(`/chat/message/${id}`);
  },
  getConversations() {
    return baseAPI.get("/chat/conversation");
  },
  getMessages(id, params = { page: 1 }) {
    return baseAPI.get(`/chat/message/${id}`, {
      params,
    });
  },
};

export default messageAPI;
