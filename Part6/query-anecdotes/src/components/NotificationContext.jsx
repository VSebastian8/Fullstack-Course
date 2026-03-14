import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      if (state === action.payload)
        return ''
      else
        return state
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const setNotification = (message) => {
    notificationDispatch({
      type: 'SET',
      payload: message
    })
    setTimeout(() => notificationDispatch({
      type: 'CLEAR',
      payload: message
    }), 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext