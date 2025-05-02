// src/components/VideoCard.jsx - Updated to send more data
import React from 'react';
import { Link } from 'react-router-dom';

// Accept video data as props
function VideoCard({ videoUrl, thumbnailUrl, duration, iconUrl, title, channelName, views, timeAgo }) {

  // --- Construct the player URL with details as query parameters ---
  const buildPlayerLink = () => {
    // Start with the base path
    let link = '/player';
    const params = [];

    // Add video URL if it exists and is not just '#'
    if (videoUrl && videoUrl !== '#') {
      params.push(`video=${encodeURIComponent(videoUrl)}`);
    } else {
       // Handle case where videoUrl is invalid - maybe link nowhere or show error?
       // For now, link to player but it will show an error there.
       // You could return '#' here to make the link non-functional if preferred.
        params.push(`video=INVALID`); // Indicate invalid video
    }

    // Add other parameters, encoding each one
    if (title) params.push(`title=${encodeURIComponent(title)}`);
    if (channelName) params.push(`channel=${encodeURIComponent(channelName)}`);
    if (iconUrl) params.push(`icon=${encodeURIComponent(iconUrl)}`);
    if (views) params.push(`v=${encodeURIComponent(views)}`); // Using short 'v' for views
    if (timeAgo) params.push(`t=${encodeURIComponent(timeAgo)}`); // Using short 't' for time

    // Join parameters if any exist
    if (params.length > 0) {
      link += `?${params.join('&')}`;
    }
    console.log("Generated Player Link:", link); // For debugging
    return link;
  };

  const playerLink = buildPlayerLink();
  // --- End URL Construction ---

  return (
    // Use the generated playerLink for navigation
    <Link to={playerLink} className="video-card">
      <div className="thumbnail-container">
        <img src={thumbnailUrl} alt="Video Thumbnail" className="thumbnail" />
        {duration && <p className="duration">{duration}</p>} {/* Conditionally render duration */}
      </div>
      <div className="video-info">
        <img src={iconUrl} alt="Channel Logo" className="icon" />
        <div className="video-details">
          <h2 className="title">{title}</h2>
          <p className="channel-name">{channelName}</p>
          <p className="views">{views} • {timeAgo}</p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;