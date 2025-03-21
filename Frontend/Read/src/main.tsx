import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./ApiClient.tsx";
import App from './App.tsx';
import "#project/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-dark-teal/theme.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
