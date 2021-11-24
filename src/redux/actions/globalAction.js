import { GlobalTypes } from "../types/globalTypes";

export const changeThemeAction = (payload) => (dispatch) => {
  dispatch({
    type: GlobalTypes.CHANGE_THEME,
    payload,
  });
};
