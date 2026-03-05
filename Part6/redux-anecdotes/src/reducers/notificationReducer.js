import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'render here notification...',
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

export const { notify, clear } = notificationSlice.actions
export default notificationSlice.reducer