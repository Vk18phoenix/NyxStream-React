import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PremiumFeature from '../components/PremiumFeature';
import PlanCard from '../components/PlanCard';
import FAQItem from '../components/FAQItem';

const faqData = [
    { id: 1, question: "What's included with NyxStream Premium?", answer: "NyxStream Premium includes ad-free streaming, downloads, background play, and access to NyxStream Music." },
    { id: 2, question: "How do I download videos and music?", answer: "With NyxStream Premium, you can download videos and music by tapping the download icon below the video or track." },
    { id: 3, question: "How do I add people to my plan?", answer: "You can invite up to 5 family members to join your NyxStream Premium family plan from your account settings." },
    { id: 4, question: "How do I play videos and music in the background?", answer: "Background play is enabled automatically with NyxStream Premium. Just start a video and switch apps." },
    { id: 5, question: "What's the difference between NyxStream Premium and NyxStream Music Premium?", answer: "NyxStream Premium covers all videos and music, while NyxStream Music Premium is focused only on music." },
    { id: 6, question: "How can I cancel my membership?", answer: "You can cancel anytime in your NyxStream account settings under \"Manage Membership\"." },
];


function PremiumPage() {
    const [openFAQ, setOpenFAQ] = useState(null);

     useEffect(() => {
        // Apply body styles specific to premium page
        document.body.style.background = 'radial-gradient(circle at top center, #2c1a35, #000000 70%)';
        document.body.style.color = 'white';
        document.body.style.fontFamily = 'Arial, sans-serif'; // Ensure font matches original premium
        document.body.style.height = 'auto'; // Allow content to define height

        // Remove main app's body classes if they interfere
        document.body.classList.remove('sidebar-hidden', 'show-mobile-search', 'dark-mode');

        // Cleanup function to remove styles/classes when navigating away
        return () => {
            document.body.style.background = '';
            document.body.style.color = '';
            document.body.style.fontFamily = '';
            document.body.style.height = '';
        };
    }, []);


    const handleFAQClick = (id) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    // Inline styles replicate the simple structure/look from premium.html
    return (
        <div> {/* Root wrapper */}
            {/* Simplified Navbar for Premium Page */}
            <div className="navbar" style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', zIndex: 1000, fontFamily: 'Arial, sans-serif' }}>
                <div className="navbar-left" style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Correct path from public folder */}
                    <img src="/images/nyxstream-high-resolution-logo.png" alt="NyxStream Logo" style={{ height: '24px', marginRight: '5px' }} />
                    <div className="logo-text" style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>NyxStream</div>
                </div>
                <div className="search-bar" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <input type="text" placeholder="Search" style={{ width: '400px', padding: '5px 10px', borderRadius: '20px', border: 'none', outline: 'none' }} />
                </div>
                <div className="navbar-right" style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ backgroundColor: '#333', border: 'none', color: 'white', padding: '8px 15px', marginRight: '10px', borderRadius: '20px', cursor: 'pointer' }}>+Create</button>
                    <button style={{ backgroundColor: '#333', border: 'none', color: 'white', padding: '8px 15px', marginRight: '10px', borderRadius: '20px', cursor: 'pointer' }}>🔔</button>
                     <Link to="/signup-login">
                        <button style={{ backgroundColor: '#333', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer' }}>👤</button>
                     </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="content" style={{ marginTop: '100px', textAlign: 'center', padding: '50px 20px' }}>
                 <div className="logo-text-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                    {/* Correct path from public folder */}
                    <img src="/images/nyxstream-high-resolution-logo.png" alt="NyxStream Premium" style={{ height: '30px' }}/>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>NyxStream Premium</span>
                 </div>
                <h1 style={{ fontSize: '48px', margin: '20px 0' }}>All NyxStream.<br />No interruptions.</h1>
                <p style={{ fontSize: '16px', margin: '20px 0' }}>NyxStream and NyxStream Music ad-free, offline, and in the background</p>
                <button className="button" style={{ backgroundColor: '#065fd4', color: 'white', border: 'none', padding: '15px 30px', fontSize: '16px', borderRadius: '25px', cursor: 'pointer', marginTop: '20px' }}>Try 2 months for ₹0</button>
                <small style={{ display: 'block', marginTop: '20px', fontSize: '14px' }}>
                    Or save money with a <a href="#" style={{ color: '#2196f3', textDecoration: 'none' }}>family</a> or <a href="#" style={{ color: '#2196f3', textDecoration: 'none' }}>student plan</a>
                </small>
            </div>

            <div className="info-text" style={{ color: 'white', fontSize: '14px', textAlign: 'center', marginTop: '50px' }}>
                You'll be reminded 7 days before your trial ends. Recurring billing. <br />
                <a href="#" style={{ color: '#2196f3', textDecoration: 'none', fontWeight: 'normal' }}>Restrictions apply.</a>
            </div>

             <div className="features" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '50px', flexWrap: 'wrap', margin: '80px 20px', textAlign: 'center' }}>
                <PremiumFeature iconClass="play-icon">
                    Ad-free so you can immerse yourself\nin your favourite videos without\ninterruption
                </PremiumFeature>
                <PremiumFeature iconClass="download-icon">
                     Download videos to watch later\nwhen you’re offline or on the go
                </PremiumFeature>
                 <PremiumFeature iconClass="background-play-icon">
                     Background play so you can watch\nwhile using other apps or with your\nscreen locked
                </PremiumFeature>
                 <PremiumFeature iconClass="music-stream-icon">
                    Stream all the music you want to\nhear, ad-free on the NyxStream Music\napp
                 </PremiumFeature>
            </div>

            <div className="plans-section" style={{ backgroundColor: '#000', color: 'white', textAlign: 'center', padding: '50px 20px' }}>
                <div className="plans" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
                     <PlanCard
                        title="👤 Individual"
                        subtitle="Prepaid or monthly"
                        price="Starts at ₹149.00/month"
                        note="Free trials with monthly plans"
                        buttonText="2 months free"
                    />
                    <PlanCard
                        title="👥 Family"
                        subtitle="Monthly"
                        price="₹299.00/month"
                        note={`14-day trial for ₹0<br/>Add up to 5 family members (aged 13+) in your household. <a href="#" style="color: #2196f3; text-decoration: none;">Restrictions apply.</a>`}
                        buttonText="Try 14 days for ₹0"
                    />
                     <PlanCard
                        title="📦 Student"
                        subtitle="Monthly"
                        price="₹89.00/month"
                        note={`14-day trial for ₹0<br/>Eligible students only. Annual verification required. <a href="#" style="color: #2196f3; text-decoration: none;">Restrictions apply.</a>`}
                        buttonText="Try 14 days for ₹0"
                    />
                </div>
                <h2 className="plans-heading" style={{ fontSize: '28px', fontWeight: 'bold' }}>Keep playing what you love – uninterrupted</h2>
            </div>

            <div className="premium-offer" style={{ backgroundColor: '#121212', textAlign: 'center', padding: '80px 20px', color: 'white', fontFamily: 'Arial, sans-serif' }}>
                <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Try Premium now</h1>
                <p style={{ fontSize: '18px', marginBottom: '30px' }}>2-month trial for ₹0 · Then ₹149.00/month · Offer ends in 5 hours · Cancel at any time</p>
                <button style={{ backgroundColor: '#2196f3', border: 'none', color: 'white', padding: '12px 25px', fontSize: '18px', borderRadius: '25px', cursor: 'pointer', marginBottom: '20px' }}>Try 2 months for ₹0</button>
                <small style={{ display: 'block', fontSize: '14px', marginTop: '10px' }}>
                    Recurring billing.<br/><a href="#" style={{ color: '#2196f3', textDecoration: 'none' }}>Restrictions apply.</a>
                </small>
            </div>

             <div className="faq-section" style={{ backgroundColor: '#121212', color: 'white', fontFamily: 'Arial, sans-serif', padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
                 <h2 style={{ fontSize: '40px', marginBottom: '30px', fontWeight: 'bold' }}>Your questions, answered</h2>
                 {faqData.map(faq => (
                    <FAQItem
                        key={faq.id}
                        question={faq.question}
                        isOpen={openFAQ === faq.id}
                        onClick={() => handleFAQClick(faq.id)}
                    >
                         <p style={{ padding: '0 10px 20px 10px', fontSize: '16px', color: '#ccc' }}>
                            {faq.answer}
                        </p>
                    </FAQItem>
                 ))}
                 <p className="help-link" style={{ marginTop: '30px', fontSize: '14px', textAlign: 'center' }}>
                    Have other questions?<br/>
                    Visit the <a href="#" style={{ color: '#2196f3', textDecoration: 'none' }}>NyxStream Help Centre</a>
                 </p>
            </div>
        </div>
    );
}

export default PremiumPage;