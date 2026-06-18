import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "../index.css"
import InterviewProvider from './features/interview/interview.theme.context.jsx'
import './i18n.js'
import {GoogleOAuthProvider} from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='99986870363-kbh8ltco3c3tbihckkcn61f7bmnoe9se.apps.googleusercontent.com'>
      <InterviewProvider>
        <App />
      </InterviewProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)