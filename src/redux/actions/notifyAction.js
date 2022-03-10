import notifyAPI from "../../api/notifyAPI";
import { toastAction } from "../actions/toastAction";
import { CHANGE_IS_READ, CHANGE_NOTIFY_ON, GET_NOTIFICATION } from "../types/notifyTypes";

export const createNotify = (msg, socket) => async (dispatch) => {
  try {
    const res = await notifyAPI.create(msg);
    socket.emit("notify", res.data.notify);
  } catch (error) {
    console.log(error);
    dispatch(toastAction("Notify error !", false));
  }
};

export const deleteNotify = (payload) => async (dispatch) => {
  try {
    await notifyAPI.delete(payload);
  } catch (error) {
    console.log(error);
    dispatch(toastAction("Notify error !", false));
  }
};

export const deleteAllNotify = () => async (dispatch) => {
  try {
    await notifyAPI.deleteAll();
  } catch (error) {
    console.log(error);
    dispatch(toastAction("Delete notify error !", false));
  }
};

export const getNotifies = () => async (dispatch) => {
  try {
    const res = await notifyAPI.getNotifies();
    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data.notifies,
    });
  } catch (error) {
    console.log(error);
    dispatch(toastAction("Delete notify error !", false));
  }
};

export const changeIsReadNotify = (payload, userID) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_IS_READ,
      payload: {
        ...payload,
        isRead: payload.isRead.filter((id) => id !== userID),
      },
    });
    await notifyAPI.changeIsRead(payload._id);
  } catch (error) {
    console.log(error);
  }
};

export const changeNofifyOn = (payload) => (dispatch) => {
  dispatch({
    type: CHANGE_NOTIFY_ON,
    payload,
  });
};
