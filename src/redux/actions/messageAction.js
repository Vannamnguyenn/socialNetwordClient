import messageAPI from "../../api/messageAPI";
import { uploadImage } from "../../until/uploadImage";
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
import { LoadingAction } from "./loadingAction";

export const createConversation =
  ({ recipients }) =>
  async (dispatch) => {
    try {
      const response = await messageAPI.createConversation({
        recipients,
      });
      dispatch({
        type: CREATE_CONVERSATION,
        payload: response.data.conversation,
      });
      dispatch({
        type: SET_CURRENT_CONVERSATION,
        payload: response.data.conversation,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const createMessage =
  ({ text, files, conversation, recipients, call }, socket) =>
  async (dispatch) => {
    try {
      let media;
      if (files) media = await uploadImage(files);
      const response = await messageAPI.createMessage({
        text,
        media,
        conversation,
        recipients,
        call,
      });
      dispatch({
        type: CREATE_MESSAGE,
        payload: response.data.message,
      });
      socket.emit("addMessage", response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

export const deleleConversation = (id) => async (dispatch) => {
  try {
    dispatch(LoadingAction(true));
    await messageAPI.deleteConversation(id);
    dispatch({
      type: DELETE_CONVERSATION,
      payload: {
        id,
      },
    });
    dispatch(LoadingAction(false));
  } catch (error) {
    console.log(error);
    dispatch(LoadingAction(false));
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_MESSAGE,
      payload: {
        id,
      },
    });
    await messageAPI.deleteMessage(id);
  } catch (error) {
    console.log(error);
  }
};

export const getConversations = () => async (dispatch) => {
  try {
    const response = await messageAPI.getConversations();

    dispatch({
      type: GET_CONVERSATION,
      payload: response.data.conversations,
    });

    dispatch({
      type: SET_CURRENT_CONVERSATION,
      payload: response.data.conversations[0],
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = (id) => async (dispatch) => {
  try {
    const response = await messageAPI.getMessages(id);
    dispatch({
      type: GET_MESSAGE,
      payload: response.data.messages,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMoreMessages = (id, params) => async (dispatch) => {
  try {
    const response = await messageAPI.getMessages(id, params);
    console.log(response.data);
    dispatch({
      type: GET_MORE_MESSAGES,
      payload: response.data.messages,
    });
  } catch (error) {
    console.log(error);
  }
};
