import { GlobalTypes } from "../types/globalTypes";

export const LoadingAction = (payload) => (dispatch) => {
  dispatch({
    type: GlobalTypes.LOADING,
    payload: {
      isLoading: payload,
    },
  });
};
