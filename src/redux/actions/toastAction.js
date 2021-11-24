import { GlobalTypes } from "../types/globalTypes";

export const toastAction = (data) => (dispatch) => {
  const isSuccess = data.success;
  dispatch({
    type: GlobalTypes.SET_TOAST,
    payload: {
      message: data.msg,
      showToast: true,
      type: isSuccess ? "success" : "danger",
    },
  });
};
