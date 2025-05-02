// src/components/Navbar.jsx - WITH DEBUGGING for Sign Out Click
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// --- REMOVED AuthContext import (Assuming basic setup) ---

// Accept user and onSignOut props from App.jsx
function Navbar({ isDarkMode, toggleDarkMode, toggleSidebar, toggleMobileSearch, user, onSignOut }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  // Keep useEffect for outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if ( dropdownRef.current && !dropdownRef.current.contains(event.target) && profileRef.current && !profileRef.current.contains(event.target) ) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) { document.addEventListener('mousedown', handleClickOutside); }
    else { document.removeEventListener('mousedown', handleClickOutside); }
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, [isDropdownOpen]);


  const handleProfileClick = () => {
    if (!user) { navigate('/signup-login'); }
    else { setIsDropdownOpen(prev => !prev); }
  };

  // --- MODIFIED: Added Alert and Log for Debugging ---
  const handleSignOutClick = async () => {
      // --- IMMEDIATE FEEDBACK ---
      console.log("!!! SIGN OUT BUTTON CLICKED !!!");
      alert("SIGN OUT BUTTON CLICKED! Check console.");
      // --- END FEEDBACK ---

      setIsDropdownOpen(false); // Close dropdown
      if (onSignOut) { // Check if the prop function exists
          console.log("Calling onSignOut prop function..."); // Log before calling
          try {
              await onSignOut(); // Call the function passed from App
              console.log("onSignOut prop function finished."); // Log after calling
          } catch(err) {
              console.error("Error during onSignOut call:", err); // Log errors from the prop function
          }
      } else {
          console.error("onSignOut prop function was NOT passed to Navbar!");
          alert("Error: Sign out function missing. Check console.");
      }
      console.log("handleSignOutClick function finished.");
  };
  // --- END MODIFIED ---

  const handleSwitchAccountsClick = () => {
      setIsDropdownOpen(false);
      navigate('/signup-login');
      console.log("Switch Accounts clicked - navigating to login.");
  };


  const handleSearchSubmit = (e) => { e.preventDefault(); console.log("Search submitted"); };

  return (
    <header>
      <nav className="navbar">
        {/* Nav Left */}
        <div className="nav-section nav-left">
          <button className="nav-button menu-button" onClick={toggleSidebar}><i className="uil uil-bars"></i></button>
          <Link to="/" className="nav-logo">
            <img src="/images/nyxstream-high-resolution-logo.png" alt="Logo" className="logo-image" />
            <h2 className="logo-text">NyxStream</h2>
          </Link>
        </div>

        {/* Nav Center */}
        <div className="nav-section nav-center">
           <button className="nav-button search-back-button" id="search-back-button" onClick={toggleMobileSearch}><i className="uil uil-arrow-left"></i></button>
           <form action="#" className="search-form" onSubmit={handleSearchSubmit}>
             <input type="search" placeholder="Search" className="search-input" required />
             <button type="submit" className="nav-button search-button"><i className="uil uil-search"></i></button>
           </form>
          <button className="nav-button mic-button"><i className="uil uil-microphone"></i></button>
        </div>

        {/* Nav Right */}
        <div className="nav-section nav-right">
          <button className="nav-button search-button" id="search-button" onClick={toggleMobileSearch}><i className="uil uil-search"></i></button>
          <button className="nav-button theme-button" onClick={toggleDarkMode}><i className={`uil ${isDarkMode ? 'uil-sun' : 'uil-moon'}`}></i></button>

          {/* Container for profile image and dropdown */}
          <div style={{ position: 'relative' }} ref={profileRef}>
            {/* Conditional Profile Image/Placeholder */}
            {user && user.photoURL ? (
              <img src={user.photoURL} alt="User profile" className="user-image" onClick={handleProfileClick} style={{ cursor: 'pointer' }} title={`Logged in as ${user.displayName || user.email}`} />
            ) : user && !user.photoURL ? (
              <div onClick={handleProfileClick} title={`Logged in as ${user.displayName || user.email}`} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', color: '#555', textTransform: 'uppercase' }}>
                {(user.displayName || user.email || '?')[0]}
              </div>
            ) : (
              <img src="https://static.wikia.nocookie.net/disney/images/2/22/Srmthfg_wiki_promo_chiro.jpg/revision/latest?cb=20120722141119" alt="Login / Sign Up" className="user-image" onClick={handleProfileClick} style={{ cursor: 'pointer' }} title="Login / Sign Up"/>
            )}

            {/* Dropdown Menu (Simplified) */}
            {isDropdownOpen && user && (
              <div className="profile-dropdown" ref={dropdownRef}>
                <button onClick={handleSwitchAccountsClick} className="dropdown-item">
                  <i className="uil uil-users-alt"></i> Switch account
                </button>
                {/* Sign Out Button - Ensure onClick is correct */}
                <button onClick={handleSignOutClick} className="dropdown-item">
                   <i className="uil uil-signout"></i> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Navbar;