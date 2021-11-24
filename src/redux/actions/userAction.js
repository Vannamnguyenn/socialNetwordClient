import { uploadImage } from "../../until/uploadImage";
import { LoadingAction } from "./loadingAction";
import userAPI from "../../api/userAPI";
import { UPDATE_PROFILE } from "../types/authType";

export const updateProfile = (payload, image, avatar) => async (dispatch) => {
  try {
    let media = null;
    if (image) media = await uploadImage([image]);
    const response = await userAPI.updateUser({
      ...payload,
      avatar: image ? media[0].url : avatar,
    });
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(LoadingAction(false));
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch(LoadingAction(false));
    return error;
  }
};
