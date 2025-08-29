import React, { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import Main from './Components/Main/Main'
import DevbotAuth from './Components/Auth/DevbotAuth'
import { GoogleLogin } from '@react-oauth/google';

import jwt_decode from "jwt-decode";

const App = () => {
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // State to manage loading state while checking authentication
  const [isLoading, setIsLoading] = useState(true)
  
  // State to store user information
  const [user, setUser] = useState(null)

  // Check if user is already logged in when app loads
  useEffect(() => {
    // Check localStorage for existing session (optional)
    const savedUser = localStorage.getItem('user')
    const savedAuth = localStorage.getItem('isAuthenticated')
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
    
    // Set loading to false after checking
    setIsLoading(false)
  }, [])

  // Function to handle successful login/registration
  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    
    // Save to localStorage (optional - for persistence across sessions)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
  }

  // Function to handle logout
  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    
    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }

  // Loading spinner styles
  const loadingStyles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb'
    },
    content: {
      textAlign: 'center'
    },
    spinner: {
      width: '48px',
      height: '48px',
      border: '4px solid #e5e7eb',
      borderTop: '4px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 16px auto'
    },
    text: {
      color: '#6b7280',
      margin: '0',
      fontSize: '16px'
    }
  }

  // App container styles
  const appStyles = {
    container: {
      display: 'flex',
      height: '100vh',
      width: '100%'
    }
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <div style={loadingStyles.container}>
          <div style={loadingStyles.content}>
            <div style={loadingStyles.spinner}></div>
            <p style={loadingStyles.text}>Loading...</p>
          </div>
        </div>
      </>
    )
  }

  // Show authentication page if user is not logged in
  // This prevents sidebar from rendering during authentication
  if (!isAuthenticated) {
    return <DevbotAuth onAuthSuccess={handleAuthSuccess} />
  }

  // Show main app if user is authenticated
  return (
    <>

    
      <div style={appStyles.container}>
        <Sidebar user={user} onLogout={handleLogout} />
        <Main user={user} />
      </div>
    </>
  )
}

export default App