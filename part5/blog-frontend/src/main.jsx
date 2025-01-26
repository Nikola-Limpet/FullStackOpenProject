import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './reducers/notificationContext'
import { UserContextProvider } from './reducers/userContext'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './App'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </Router>
)