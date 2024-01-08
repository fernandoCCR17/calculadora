import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CalculadoraProvider } from '../context/CalculadoraProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CalculadoraProvider>
      <App />
    </CalculadoraProvider>
  </React.StrictMode>,
)
