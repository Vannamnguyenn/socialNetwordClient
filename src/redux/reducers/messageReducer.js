import {
  CREATE_CONVERSATION,
  CREATE_MESSAGE,
  DELETE_CONVERSATION,
  DELETE_MESSAGE,
  GET_CONVERSATION,
  GET_MESSAGE,
  GET_MORE_MESSAGES,
  SET_CURRENT_CONVERSATION,
} from "../types/messageTypes";

const initialState = {
  messages: [],
  conversations: [],
  currentConversation: null,
};
const messageReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case CREATE_CONVERSATION:
      return {
        ...state,
        conversations: [payload, ...state.conversations],
      };
    case CREATE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case GET_MORE_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...payload],
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages].filter(
          (message) => message._id !== payload.id
        ),
      };
    case DELETE_CONVERSATION:
      const newConversations = [...state.conversations].filter(
        (c) => c._id !== payload.id
      );

      return {
        ...state,
        conversations: newConversations,
        currentConversation: newConversations[0],
        messages: [],
      };
    case GET_CONVERSATION:
      return {
        ...state,
        conversations: payload,
      };
    case SET_CURRENT_CONVERSATION:
      return {
        ...state,
        currentConversation: payload,
      };
    case GET_MESSAGE:
      return {
        ...state,
        messages: payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
