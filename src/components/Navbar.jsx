import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/nyxstream-high-resolution-logo.png';
import { Link, useNavigate } from 'react-router-dom';

// Accept user and onSignOut props from App.jsx
function Navbar({ isDarkMode, toggleDarkMode, toggleSidebar, toggleMobileSearch, user, onSignOut }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  // YOUR useEffect for outside click (UNCHANGED)
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

  // YOUR handleProfileClick (UNCHANGED)
  const handleProfileClick = () => {
    if (!user) { navigate('/signup-login'); }
    else { setIsDropdownOpen(prev => !prev); }
  };

  // YOUR handleSignOutClick (UNCHANGED)
  const handleSignOutClick = async () => {
      console.log("!!! SIGN OUT BUTTON CLICKED !!!");
      setIsDropdownOpen(false);
      if (onSignOut) {
          try {
              await onSignOut();
          } catch(err) {
              console.error("Error during onSignOut call:", err);
          }
      } else {
          console.error("onSignOut prop function was NOT passed to Navbar!");
      }
  };
  
  // YOUR handleSwitchAccountsClick (UNCHANGED)
  const handleSwitchAccountsClick = () => {
      setIsDropdownOpen(false);
      navigate('/signup-login');
  };

  // YOUR handleSearchSubmit (UNCHANGED)
  const handleSearchSubmit = (e) => { e.preventDefault(); console.log("Search submitted"); };

  return (
    <header>
      <nav className="navbar">
        {/* Nav Left */}
        <div className="nav-section nav-left">
          <button className="nav-button menu-button" onClick={toggleSidebar}><i className="uil uil-bars"></i></button>
          {/* --- CHANGE 1: CORRECTED LOGO --- */}
          {/* This uses the :where selector from your CSS so the logo and text are always visible */}
          <Link to="/" className="nav-logo">
            <img src={logo} alt="Logo" className="logo-image" />

            <h1 className="logo-text">NyxStream</h1>
          </Link>
          {/* --- END OF CHANGE 1 --- */}
        </div>

        {/* Nav Center (UNCHANGED) */}
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

          {/* --- CHANGE 2: CORRECTED USER PROFILE / SIGN IN LOGIC --- */}
          <div style={{ position: 'relative' }} ref={profileRef}>
            {user ? (
              // If the user IS logged in, show their avatar (your existing logic)
              <>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User profile" className="user-image" onClick={handleProfileClick} style={{ cursor: 'pointer' }} title={`Logged in as ${user.displayName || user.email}`} />
                ) : (
                  <div onClick={handleProfileClick} title={`Logged in as ${user.displayName || user.email}`} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', color: '#555', textTransform: 'uppercase' }}>
                    {(user.displayName || user.email || '?')[0]}
                  </div>
                )}
                {/* Your Dropdown Menu (UNCHANGED) */}
                {isDropdownOpen && (
                  <div className="profile-dropdown" ref={dropdownRef}>
                    <button onClick={handleSwitchAccountsClick} className="dropdown-item">
                      <i className="uil uil-users-alt"></i> Switch account
                    </button>
                    <button onClick={handleSignOutClick} className="dropdown-item">
                       <i className="uil uil-signout"></i> Sign out
                    </button>
                  </div>
                )}
              </>
            ) : (
              // If the user IS NOT logged in, show the "Sign In" button
              <Link to="/signup-login" className="signin-button">
                <i className="uil uil-user-circle"></i>
                <span>Sign In</span>
              </Link>
            )}
          </div>
          {/* --- END OF CHANGE 2 --- */}
        </div>
      </nav>
    </header>
  );
}
export default Navbar;