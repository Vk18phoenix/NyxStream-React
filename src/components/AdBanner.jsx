import React from 'react';
import { Link } from 'react-router-dom';

function AdBanner() {
  return (
    <div className="ad1">
      <div className="cont">
        <p className="off">Skip your ads. Don't miss this offer</p>
        <p className="feat">NyxStream featured</p>
        <p className="term">t&c applied. Cancel anytime</p><br />
        <Link to="/premium" className="cta-button">14 days free</Link>
      </div>
      <div className="mobile-image">
        <img src="https://static1.pocketlintimages.com/wordpress/wp-content/uploads/wm/2024/11/youtube-premium-1.jpg?q=49&fit=crop&w=1140&h=&dpr=2" alt="Mobile Image" />
      </div>
    </div>
  );
}

export default AdBanner;