import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    createUser(state, action) {
      state.push(action.payload);
    },
    setUsers(state, action) {
      return action.payload;
    },
  },
});

const { setUsers, createUser } = usersSlice.actions;

export const refreshUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const appendUser = (username, password) => {
  return async (dispatch) => {
    const newUser = await usersSlice.create({ username, password });
    dispatch(createUser(newUser));
  };
};

export default usersSlice.reducer;
