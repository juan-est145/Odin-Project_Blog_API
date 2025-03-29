import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "#project/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-dark-teal/theme.css"
import { LoggedProvider } from './Context.tsx';
import { PrimeReactProvider } from "primereact/api";
//import { RouterProvider } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoggedProvider>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </LoggedProvider>
  </StrictMode>,
)
