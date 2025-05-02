import React from 'react';

function PlanCard({ title, subtitle, price, note, buttonText }) {
    // Use dangerouslySetInnerHTML for the note which contains HTML like <br> and <a>
    const createMarkup = (htmlString) => {
        // Basic sanitization example (replace with a proper library if needed)
        const sanitizedHtml = htmlString
            .replace(/<script.*?>.*?<\/script>/gi, '') // Remove script tags
            .replace(/javascript:/gi, ''); // Remove javascript: protocol
        return {__html: sanitizedHtml};
    }

    return (
        <div className="plan-card">
            <div className="plan-title">{title}</div>
            <div className="plan-subtitle">{subtitle}</div>
            <div className="plan-price">{price}</div>
            <div className="plan-note" dangerouslySetInnerHTML={createMarkup(note)}></div>
            <button className="plan-button">{buttonText}</button>
        </div>
    );
}

export default PlanCard;