// src/App.jsx - SIMPLIFIED Loading Logic
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PremiumPage from './pages/PremiumPage';
import PlayerPage from './pages/PlayerPage';
import SignupLoginPage from './pages/SignupLoginPage';
import Navbar from './components/Navbar';
import IntroMobileOffer from './components/IntroMobileOffer';
import { auth, onAuthStateChanged, signOut as firebaseSignOut } from './firebaseConfig';

const MOBILE_BREAKPOINT = 768;
const INTRO_STORAGE_KEY = 'nyxstream_intro_dismissed';

function App() {
  // --- State ---
  const [isSidebarHidden, setIsSidebarHidden] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("darkMode") === "enabled");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // Still needed for initial auth check
  const [showIntroOffer, setShowIntroOffer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  // --- Effect for Intro Offer Check (Keep as is) ---
  useEffect(() => {
    const dismissed = localStorage.getItem(INTRO_STORAGE_KEY);
    const checkMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
    const mobile = checkMobile();
    setIsMobile(mobile);
    if (mobile && !dismissed) { setShowIntroOffer(true); }
     else { setShowIntroOffer(false); }
    // We don't need the resize listener for now, simplifies things
  }, []); // Run only once

  // --- Auth Listener (Keep as is) ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("App.jsx: Auth state changed. User:", user ? user.email : 'None');
        setCurrentUser(user);
        setAuthLoading(false); // Mark auth check complete
    });
    return unsubscribe;
  }, []);

  // --- Dark Mode Effect (Keep as is) ---
  useEffect(() => {
    if (isDarkMode) { document.body.classList.add('dark-mode'); localStorage.setItem("darkMode", "enabled"); }
    else { document.body.classList.remove('dark-mode'); localStorage.setItem("darkMode", "disabled"); }
  }, [isDarkMode]);

  // Reset Mobile Search (Keep as is)
  useEffect(() => { setShowMobileSearch(false); }, [currentPath]);

  // Toggle Functions & SignOut Handler (Keep as is)
  const toggleSidebar = () => setIsSidebarHidden(prev => !prev);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleMobileSearch = () => setShowMobileSearch(prev => !prev);
  const closeSidebar = () => setIsSidebarHidden(true);
  const handleSignOut = async () => { try { await firebaseSignOut(auth); } catch (error) { console.error("Sign Out Error:", error); } };

  // Intro Offer Handlers (Keep as is)
  const handleDismissIntro = () => { localStorage.setItem(INTRO_STORAGE_KEY, 'true'); setShowIntroOffer(false); };
  const handleTryPremium = () => { localStorage.setItem(INTRO_STORAGE_KEY, 'true'); setShowIntroOffer(false); navigate('/premium'); };


  // --- SIMPLIFIED RENDER LOGIC ---

  // 1. Show Intro Offer if needed
  if (showIntroOffer && isMobile) { // Double check isMobile state here
    return <IntroMobileOffer onDismiss={handleDismissIntro} onTryPremium={handleTryPremium} />;
  }

  // 2. Show Loading ONLY during initial auth check AFTER intro logic
  if (authLoading) {
    // Render a very basic loading state, maybe without any layout yet
     return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: isDarkMode ? '#171717' : '#fff', color: isDarkMode ? '#d4d4d4' : '#000' }}>Loading...</div>;
  }

  // 3. Auth check done, intro not shown: Render main app using Routes
  const isLoginPage = currentPath === '/signup-login';
  const isPremiumPage = currentPath === '/premium';
  const useStandardLayoutWrapper = !isLoginPage && !isPremiumPage;

  return (
    <Routes>
      {/* Full Screen Routes */}
      <Route path="/signup-login" element={<SignupLoginPage />} />
      <Route path="/premium" element={<PremiumPage />} />

      {/* Catch-all for Standard Layout Pages */}
      <Route path="*" element={
          <div className={`standard-layout-wrapper ${isSidebarHidden ? 'sidebar-hidden' : ''} ${showMobileSearch ? 'show-mobile-search' : ''}`}>
            <Navbar
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              toggleSidebar={toggleSidebar}
              toggleMobileSearch={toggleMobileSearch}
              user={currentUser}
              onSignOut={handleSignOut}
            />
            <Routes>
                <Route index element={ <HomePage isSidebarHidden={isSidebarHidden} closeSidebar={closeSidebar} toggleSidebar={toggleSidebar} /> } />
                <Route path="player" element={<PlayerPage user={currentUser} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        } />
    </Routes>
  );
}
export default App;