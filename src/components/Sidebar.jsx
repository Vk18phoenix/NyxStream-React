import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Sidebar({ toggleSidebar }) {
  return (
    <aside className="sidebar">
       <div className="nav-section nav-left">
            <button className="nav-button menu-button" onClick={toggleSidebar}>
              <i className="uil uil-bars"></i>
            </button>
            <Link to="/" className="nav-logo">
              <img src="/images/nyxstream-high-resolution-logo.png" alt="Logo" className="logo-image" />
              <h2 className="logo-text">NyxStream</h2>
            </Link>
       </div>

      <div className="links-container">
        <div className="link-section">
          <NavLink to="/" className="link-item" end> <i className="uil uil-estate"></i> Home </NavLink>
          {/* --- THIS IS THE CORRECTED LINK --- */}
          <Link to="/shorts" className="link-item"> <i className="uil uil-video"></i> Shorts </Link>
          <NavLink to="/subscriptions" className="link-item"> <i className="uil uil-tv-retro"></i> Subscriptions </NavLink>
        </div>
        <div className="section-separator"></div>
        <div className="link-section">
          <h4 className="section-title">You</h4>
          <Link to="/channel" className="link-item"> <i className="uil uil-user-square"></i> Your channel </Link>
          <Link to="/history" className="link-item"> <i className="uil uil-history"></i> History </Link>
          <Link to="/watchlater" className="link-item"> <i className="uil uil-clock"></i> Watch later </Link>
        </div>
        <div className="section-separator"></div>
        <div className="link-section">
          <h4 className="section-title">Explore</h4>
          <Link to="/trending" className="link-item"> <i className="uil uil-fire"></i> Trending </Link>
          <Link to="/music" className="link-item"> <i className="uil uil-music"></i> Music </Link>
          <Link to="/gaming" className="link-item"> <i className="uil uil-basketball"></i> Gaming </Link>
          <Link to="/sports" className="link-item"> <i className="uil uil-trophy"></i> Sports </Link>
        </div>
        <div className="section-separator"></div>
        <div className="link-section">
          <h4 className="section-title">More from NyxStream</h4>
          <Link to="/premium" className="link-item"> <i className="uil uil-shield-plus"></i> NyxStream Plus </Link>
          <a href="#" className="link-item"> <i className="uil uil-headphones-alt"></i> NyxStream Music </a>
          <a href="#" className="link-item"> <i className="uil uil-airplay"></i> NyxStream Kids </a>
        </div>
        <div className="section-separator"></div>
        <div className="link-section">
          <a href="#" className="link-item"> <i className="uil uil-setting"></i> Settings </a>
          <a href="#" className="link-item"> <i className="uil uil-file-medical-alt"></i> Report </a>
          <a href="#" className="link-item"> <i className="uil uil-question-circle"></i> Help </a>
          <a href="#" className="link-item"> <i className="uil uil-exclamation-triangle"></i> Feedback </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;