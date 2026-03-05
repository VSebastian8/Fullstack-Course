import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action){
      return action.payload
    },
    clear(state, action){
      if(action.payload === state)
        return ''
      return state
    }
  }
})

const { notify, clear } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return (dispatch) => {
    dispatch(notify(notification))
    setTimeout(() => dispatch(clear(notification)), 1000 * time)
  }
}

export default notificationSlice.reducer