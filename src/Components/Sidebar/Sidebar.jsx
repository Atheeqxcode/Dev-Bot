import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context.jsx'

// Updated Sidebar component that accepts user and onLogout props
const Sidebar = ({ user, onLogout }) => {
  const [extended, setExtended] = useState(false)
  
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)
  
  const loadPrompt = async(prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  // Function to handle logout with confirmation
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear any context data if needed
      newChat() // Start fresh chat
      
      // Call the logout function passed from App.jsx
      onLogout()
    }
  }

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
        
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        
        {extended ? 
          <div className="recent">
            <p className='recent-title'>Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              )
            })}
          </div>
          : null
        }
      </div>

      <div className="bottom">
        {/* User Profile Section - shows when extended */}
        {extended && user && (
          <div className="user-profile">
            <div className="user-info">
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=4F46E5&color=fff`} 
                alt={user.name} 
                className="user-avatar"
              />
              <div className="user-details">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>History</p> : null}
        </div>
        
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>

        {/* Logout Button */}
        <div className="bottom-item recent-entry logout-item" onClick={handleLogout}>
          <img src={assets.logout_icon || assets.setting_icon} alt="logout" />
          {extended ? <p>Logout</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar