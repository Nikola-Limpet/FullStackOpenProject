import { createContext, useReducer } from 'react'

const notifyReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return action.payload
    case 'VOTE':
      return action.payload
    case 'SHORT':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const NotifyContext = createContext()

export const NotifyContextProvider = ({ children }) => {
  const [message, dispatch] = useReducer(notifyReducer, '')

  const setNotification = (type, payload) => {
    dispatch({ type, payload })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  return (
    <NotifyContext.Provider value={[message, setNotification]}>
      {children}
    </NotifyContext.Provider>
  )
}