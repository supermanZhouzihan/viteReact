import React from 'react'
import ReactDOM from 'react-dom/client'
import "reset-css"
import App from './App'
import '@/assets/styles/global.scss'
import Router from './routes'
import AuthRouter from "@/routes/authRouter"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Router /> */}
    <BrowserRouter>
      <AuthRouter>
        <App></App>
      </AuthRouter>

    </BrowserRouter>
  </React.StrictMode>,
)
