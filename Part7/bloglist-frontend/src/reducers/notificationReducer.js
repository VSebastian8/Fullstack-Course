import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notify(state, action) {
      return action.payload;
    },
    clear(state, action) {
      if (action.payload === state.message) return null;
      return state;
    },
  },
});

const { notify, clear } = notificationSlice.actions;

export const setNotification = (message, isError = false, time = 5) => {
  return (dispatch) => {
    dispatch(notify({ message, isError }));
    setTimeout(() => dispatch(clear(message)), 1000 * time);
  };
};

export default notificationSlice.reducer;
