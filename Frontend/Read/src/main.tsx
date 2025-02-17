import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import "#primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-dark-teal/theme.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
