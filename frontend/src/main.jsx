import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,              // good for auth
      refetchOnWindowFocus: false,
    },
  },
});



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
