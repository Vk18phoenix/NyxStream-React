// src/components/IntroMobileOffer.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// Define PropTypes for the component
IntroMobileOffer.propTypes = {
  onDismiss: PropTypes.func.isRequired, // Expects a function called onDismiss
  onTryPremium: PropTypes.func.isRequired // Expects a function for the try button
};


function IntroMobileOffer({ onDismiss, onTryPremium }) {

  return (
    <div className="intro-offer-overlay"> {/* Full screen overlay */}
      <div className="intro-offer-content"> {/* Centered content */}

        {/* Header with Logo */}
        <div className="intro-offer-header">
            {/* Simple text logo for now, replace with image/SVG if needed */}
             <span className="intro-logo-play">▶</span> NyxStream Premium
        </div>

        {/* Main Text */}
        <div className="intro-offer-text">
          <h2>Treat your household to ad-free NyxStream</h2> {/* Changed YouTube to NyxStream */}
          <p>With the family plan, you get 6 separate accounts per household for 1 price</p>
        </div>

        {/* Action Buttons */}
        <div className="intro-offer-actions">
          <button className="intro-button primary" onClick={onTryPremium}>
            Try 14 days
          </button>
          <button className="intro-button secondary" onClick={onDismiss}>
            I'll pass this time
          </button>
        </div>

        {/* Footer Text */}
        <div className="intro-offer-footer">
          <p>Terms apply. Cancel anytime.</p>
        </div>

      </div>
    </div>
  );
}

export default IntroMobileOffer;