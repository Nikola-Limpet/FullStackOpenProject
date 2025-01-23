import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import App from './App'

import { configureStore } from '@reduxjs/toolkit'
import { anecdoteReducer, filterReducer } from './reducers/store'
import notification from './reducers/notificationReducer'


const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
    notification: notification
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)