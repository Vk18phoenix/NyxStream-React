// src/pages/SignupLoginPage.jsx - CENTERED LAYOUT
import React, { useEffect, useState } from 'react'; // Need state for error/loading
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../firebaseConfig';

function SignupLoginPage() {
    const navigate = useNavigate();
    const [actionLoading, setActionLoading] = useState(false); // For button state
    const [error, setError] = useState('');

    // Remove the useEffect that changes body style - CSS handles it
    // useEffect(() => { ... }, []);

     // Keep the exact same working function
    const handleGoogleSignInClick = async () => {
        setError(''); // Clear previous errors
        setActionLoading(true);
        try {
            console.log("Attempting Google Sign In (Centered)...");
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google Sign-In Popup Success. User:", result.user.email);
            navigate('/'); // Navigate home
        } catch (err) {
            console.error("Google Sign-In Error:", err.code, err.message);
            let friendlyMessage = `Login Failed: ${err.message}`;
            if (err.code === 'auth/popup-closed-by-user') { friendlyMessage = 'Sign-in cancelled.'; }
            else if (err.code === 'auth/cancelled-popup-request') { friendlyMessage = 'Sign-in cancelled.'; }
            setError(friendlyMessage);
        } finally {
             setActionLoading(false); // Stop loading indicator
        }
    };

    return (
        // Use the new container class
        <div className="simple-auth-container">

            {/* Large Centered Heading */}
            <h1 className="simple-auth-heading">
                Sign-in with <span className="simple-auth-google">
                    <span className="g-blue">G</span>
                    <span className="o-red">o</span>
                    <span className="o-yellow">o</span>
                    <span className="g-blue">g</span>
                    <span className="l-green">l</span>
                    <span className="e-red">e</span>
                </span>
            </h1>

            {/* Google Sign in Button */}
            <button
                onClick={handleGoogleSignInClick}
                className="simple-auth-button" // Use the new button class
                disabled={actionLoading}
            >
                 {/* Icon added via CSS ::before */}
                {actionLoading ? 'Signing in...' : 'Sign in with Google'}
            </button>

            {/* Error Display */}
            {error && <p className="simple-auth-error">{error}</p>}
             {actionLoading && !error && <p className="simple-auth-error" style={{color: '#666'}}>Processing...</p>} {/* Simple loading text */}

        </div>
    );
}

export default SignupLoginPage;