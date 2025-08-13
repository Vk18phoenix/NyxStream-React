// src/pages/PlayerPage.jsx - EXACT YouTube Layout with Firestore
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
    incrementViewCount, listenToVideoData, getLikeStatus, setLikeStatus, addComment, listenToComments
} from '../firebaseUtils'; // Ensure this path is correct

// --- "Up Next" video data from your screenshot ---
const upNextVideos = [
    { id: 'upNext1', url: '#', thumb: 'https://i.ytimg.com/vi/GkJ_wZy0iB4/mqdefault.jpg', title: 'Hyper Aadi & Raising Raju Performance | Jabardasth | 2n...', channel: 'ETV Jabardasth', views: '2.7M views', time: '3 years ago', duration: '9:10' },
    { id: 'upNext2', url: '#', thumb: 'https://i.ytimg.com/vi/l9f3y9nHQ7Y/mqdefault.jpg', title: 'Hyper Aadi & Raising Raju Performance | Jabardasth | 18...', channel: 'ETV Jabardasth', views: '2.3M views', time: '4 years ago', duration: '8:24' },
    { id: 'upNext3', url: '#', thumb: 'https://i.ytimg.com/vi/7JMApWYhFjQ/mqdefault.jpg', title: 'Hyper Aadi & Raising Raju Performance | Jabardasth | 25...', channel: 'ETV Jabardasth', views: '3.3M views', time: '4 years ago', duration: '8:37' },
    { id: 'upNext4', url: '#', thumb: 'https://i.ytimg.com/vi/pMhfbh1N3oQ/mqdefault.jpg', title: 'Dhookudu Telugu Full Movie 4K | Dhanush | Vijay Sethupathi |...', channel: 'Telugu Filmnagar', views: '2.3M views', time: '1 year ago', duration: '2:57:49' },
    { id: 'upNext5', url: '#', thumb: 'https://i.ytimg.com/vi/Zo5kxK4j2qY/mqdefault.jpg', title: 'Hyper Aadi & Raising Raju Performance | Jabardasth | 20...', channel: 'ETV Jabardasth', views: '1.2M views', time: '2 years ago', duration: '12:27' },
    { id: 'upNext6', url: '#', thumb: 'https://i.ytimg.com/vi/-NKOPAtHRpI/mqdefault.jpg', title: 'Hyper Aadi & Raising Raju Performance | Jabardasth | 18...', channel: 'ETV Jabardasth', views: '2.2M views', time: '3 years ago', duration: '9:18' },
];
// --- END Up Next Data ---

function PlayerPage({ user: currentUser }) {
    const [searchParams] = useSearchParams();
    const [error, setError] = useState('');
    const [videoData, setVideoData] = useState({ likeCount: 0, dislikeCount: 0, viewCount: 0, description: '', title: '', channelName: '', channelIcon: '', subscriberCount: 0, tags: '' });
    const [likeStatus, setLikeStatus] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [actionLoading, setActionLoading] = useState({ like: false, comment: false });
    const [activeOptionsMenu, setActiveOptionsMenu] = useState(null);
    const optionsMenuRef = useRef(null);

    const videoId = useCallback(() => searchParams.get('v') || searchParams.get('video') || null, [searchParams]);
    const initialTitle = searchParams.get('title');
    const initialChannelName = searchParams.get('channel');
    const initialChannelIcon = searchParams.get('icon');
    const initialViews = searchParams.get('v_count') || searchParams.get('views');
    const initialTimeAgo = searchParams.get('t') || searchParams.get('time');
    const videoUrl = searchParams.get('video');
    const currentVideoId = videoId();

    useEffect(() => { /* ... same data fetching and setup useEffect ... */ }, [currentVideoId, currentUser, initialTitle, initialChannelName, initialChannelIcon]);
    useEffect(() => { /* ... same outside click for options menu useEffect ... */ }, [activeOptionsMenu]);

    const handleLikeDislike = async (newStatus) => { /* ... same logic ... */ };
    const handleCommentSubmit = async (e) => { /* ... same logic ... */ };
    const formatCount = (num) => { /* ... same logic ... */ };
    const formatTimestamp = (ts) => { /* ... same logic ... */ };
    const toggleUpNextOptionsMenu = (videoId) => setActiveOptionsMenu(prev => prev === videoId ? null : videoId);
    const handleUpNextOption = (option, video) => { console.log(`Selected "${option}" for: ${video.title}`); setActiveOptionsMenu(null); };

    return (
        // This div takes the two-column layout styling from CSS
        <div className="player-page-layout">

            {/* === Primary Column (Left: Video Player, Meta, Description, Comments) === */}
            <div className="primary-column">
                <div className="video-player-container">
                    {error ? (<p className="player-error">{error}</p>) :
                     videoUrl && videoUrl !== 'INVALID' ? ( <video src={videoUrl} controls autoPlay className="video-player" key={videoUrl} /> ) :
                     (<div className="video-player-placeholder">Loading video...</div>)
                    }
                </div>

                <div className="video-metadata-container">
                    <h1 className="video-title">{videoData.title || initialTitle || 'Hyper Aadi & Raising Raju Performance | Jabardasth | 27th January 2022 | ETV Telugu'}</h1>
                    <div className="video-actions-row">
                        <div className="channel-info">
                             <img src={videoData.channelIcon || initialChannelIcon || 'https://yt3.ggpht.com/ytc/AIdro_kF9qK7uY3Z5E5t1A9S9J1p1j9I8M2J6U9H0A8X4w=s88-c-k-c0x00ffffff-no-rj'} alt="Channel" className="channel-avatar" />
                             <div className="channel-details">
                                <Link to="#" className="channel-name">{videoData.channelName || initialChannelName || 'ETV Jabardasth'}</Link>
                                <span className="channel-subscribers">{formatCount(videoData.subscriberCount || 15200000)} subscribers</span>
                             </div>
                             <button className="subscribe-button">Subscribe</button>
                        </div>
                        <div className="action-buttons">
                            <button className={`action-button like-dislike`} onClick={() => handleLikeDislike('like')} disabled={actionLoading.like || !currentUser} title={currentUser ? "Like" : "Log in to like"}>
                                <i className={`uil ${likeStatus === 'like' ? 'bxs-like' : 'uil-thumbs-up'}`}></i> {formatCount(videoData.likeCount || 47000)}
                                <span className="separator"></span>
                                <i className={`uil ${likeStatus === 'dislike' ? 'bxs-dislike' : 'uil-thumbs-down'}`} onClick={(e) => { e.stopPropagation(); handleLikeDislike('dislike'); }} title={currentUser ? "Dislike" : "Log in to dislike"} ></i>
                             </button>
                            <button className="action-button"><i className="uil uil-share"></i> Share</button>
                            <button className="action-button"><i className="uil uil-download-alt"></i> Download</button>
                            <button className="action-button save-button"><i className="uil uil-bookmark-full"></i> Clip</button> {/* Changed to Clip from Save based on image */}
                            <button className="action-button more-button"><i className="uil uil-ellipsis-h"></i></button>
                        </div>
                    </div>
                    <div className={`video-description-box ${showFullDescription ? 'expanded' : ''}`}>
                        <p>
                            <span className="view-count">{formatCount(videoData.viewCount || 2600000)} views</span>
                            <span className="upload-time">{initialTimeAgo || '3 years'} ago</span>
                            <span className="video-tags"> {videoData.tags || '#bestofjabardasth #telugucomedyshow #sudigaalisudheer'}</span>
                        </p>
                        <p className="description-text">{videoData.description || 'Hyper Aadi & Raising Raju Performance in Jabardasth on 27th January 2022. ETV Telugu. (More description here)'} {showFullDescription && " Rest of the description..."}</p>
                        {(videoData.description || "Long description text".length > 100) &&
                           <button className="show-more-button" onClick={() => setShowFullDescription(!showFullDescription)}> {showFullDescription ? 'Show less' : 'Show more'} </button>
                        }
                    </div>
                    <div className="live-chat-replay-container">
                        <button className="live-chat-replay-button">Live chat replay</button>
                    </div>
                    <div className="comments-section">
                        <h2>Comments ({comments.length || '...'})</h2>
                        {/* ... comment form and list ... */}
                    </div>
                 </div>
            </div>

            {/* === Secondary Column ("Up Next" Sidebar) === */}
            <div className="secondary-column up-next-sidebar">
                 <div className="up-next-header"> {/* Header for the up next list */}
                     <div className="related-category-filters top-filters"> {/* Filters at the top of sidebar */}
                         <button className="category-button active">All</button>
                         <button className="category-button">From ETV Jabardasth</button>
                         <button className="category-button">Hyper Aadi</button>
                         <button className="category-button">Related</button>
                         <button className="category-button next-arrow" title="Next"><i className="uil uil-angle-right-b"></i></button>
                     </div>
                     {/* Removed the "NyxStream Mix" header to match screenshot more closely */}
                 </div>
                 <div className="up-next-list"> {/* Scrollable list */}
                    {upNextVideos.map((item) => (
                        <div key={item.id} className="up-next-item video-item"> {/* Each item is a flex container */}
                            <Link to={`/player?v=${encodeURIComponent(item.id || '#')}&title=${encodeURIComponent(item.title)}&channel=${encodeURIComponent(item.channel)}`} className="up-next-link-wrapper"> {/* Link wraps thumb and info */}
                                <div className="up-next-thumbnail-container">
                                    <img src={item.thumb} alt={item.title} className="up-next-thumbnail" />
                                    <span className="up-next-duration">{item.duration}</span>
                                </div>
                                <div className="up-next-info">
                                    <h4 className="up-next-title">{item.title}</h4>
                                    <span className="up-next-channel">{item.channel}</span>
                                    <span className="up-next-views-time">{item.views} • {item.time}</span>
                                </div>
                            </Link>
                            <button className="icon-button options-button" onClick={(e) => { e.stopPropagation(); toggleUpNextOptionsMenu(item.id); }} title="More options">
                                <i className="uil uil-ellipsis-v"></i>
                            </button>
                            {activeOptionsMenu === item.id && (
                                <div className="up-next-options-menu" ref={optionsMenuRef}>
                                    <button onClick={() => handleUpNextOption('queue', item)}><i className="uil uil-list-ul"></i> Add to queue</button>
                                    <button onClick={() => handleUpNextOption('watch-later', item)}><i className="uil uil-clock"></i> Save to Watch Later</button>
                                    {/* <button onClick={() => handleUpNextOption('remove', item)}><i className="uil uil-trash-alt"></i> Remove from list</button> */}
                                </div>
                            )}
                       </div>
                    ))}
                 </div>
                 {/* Removed bottom filters as they are now at the top of this column */}
            </div>
        </div>
    );
}
export default PlayerPage;