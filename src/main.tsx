import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './index.css'
import { Navbar } from './components/navbar/Navbar'
import { PetsContextProvider } from './context/petsContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PetsContextProvider>
      <BrowserRouter>
        <Navbar />
        <App />
      </BrowserRouter>
    </PetsContextProvider>
  </React.StrictMode>,
)
