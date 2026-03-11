import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear(state, action) {
      return null;
    },
  },
});

const { set, clear } = userSlice.actions;

export const checkUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(set(user));
      blogService.setToken(user.token);
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
    dispatch(set(user));
    blogService.setToken(user.token);
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(clear());
    blogService.setToken("");
    window.localStorage.removeItem("loggedBloglistUser");
  };
};

export default userSlice.reducer;
