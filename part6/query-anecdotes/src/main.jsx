import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotifyContextProvider } from './notifyContext'


const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <NotifyContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotifyContextProvider>
)