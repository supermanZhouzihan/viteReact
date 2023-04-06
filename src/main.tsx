import React from 'react'
import ReactDOM from 'react-dom/client'
import "reset-css"
import App from './App'
import '@/assets/styles/global.scss'
import Router from './routes'

import {BrowserRouter} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Router /> */}
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </React.StrictMode>,
)
