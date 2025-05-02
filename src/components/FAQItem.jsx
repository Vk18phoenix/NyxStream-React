import React from 'react';

function FAQItem({ question, children, isOpen, onClick }) {
    return (
        <div className="faq-item">
            <button className={`faq-question ${isOpen ? 'active' : ''}`} onClick={onClick}>
                {question}
                <span className="arrow">{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="faq-answer" style={{ display: 'block' }}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default FAQItem;