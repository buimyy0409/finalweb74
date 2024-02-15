import api from "../../api";
import { toast } from "react-toastify";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SAVE_PROFILE,
} from "./actionTypes";

export const postLoginData = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const response = await api.post("/auth/login", { email, password });
    const { data } = response;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("token", data.token);
    toast.success(data.msg);
  } catch (error) {
    const msg = error.response?.data?.msg || error.message;
    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg },
    });
    toast.error(msg);
  }
};

export const saveProfile = (token) => async (dispatch) => {
  try {
    const response = await api.get("/profile", {
      headers: { Authorization: token },
    });
    const { data } = response;
    dispatch({
      type: SAVE_PROFILE,
      payload: { user: data.user, token },
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
  window.location.href = "/";
};