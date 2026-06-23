import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('[PizzeriaIA] main.jsx cargado')

const rootElement = document.getElementById('root')
console.log('[PizzeriaIA] Elemento root:', rootElement)

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

console.log('[PizzeriaIA] App montada en el DOM')
