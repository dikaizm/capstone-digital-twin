import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import axios from 'axios'
axios.defaults.withCredentials = true

import '@/index.css'
import { NotificationProvider } from './context/NotificationContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>,
)
