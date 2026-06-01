import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './lib/i18n'
import { initEcho } from './lib/echo'
import { initSentry } from './lib/sentry'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()

initSentry()
initEcho()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
