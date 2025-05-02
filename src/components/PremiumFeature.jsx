import React from 'react';

function PremiumFeature({ iconClass, children }) {
    let iconContent = null;
    if (iconClass.includes('play-icon')) {
        iconContent = <div className="icon play-icon"></div>;
    } else if (iconClass.includes('download-icon')) {
        iconContent = <div className="icon download-icon"><div className="download-lines"></div></div>;
    } else if (iconClass.includes('background-play-icon')) {
        iconContent = <div className="icon background-play-icon"></div>;
    } else if (iconClass.includes('music-stream-icon')) {
        iconContent = <div className="icon music-stream-icon"><div className="music-waves"></div></div>;
    } else {
        iconContent = <div className={`icon ${iconClass}`}></div>;
    }

    return (
        <div className="feature">
            {iconContent}
            <p dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br/>') }}></p>
        </div>
    );
}

export default PremiumFeature;