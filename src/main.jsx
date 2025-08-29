// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/Context.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <GoogleOAuthProvider clientId="791074257940-bhvsb6sb77vaiajh2ffuepv68frfu9b0.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </ContextProvider>
);
