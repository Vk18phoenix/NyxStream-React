// src/pages/PlayerPage.jsx - FULL WIDTH LAYOUT with Firestore
import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
    incrementViewCount, listenToVideoData, getLikeStatus, setLikeStatus, addComment, listenToComments
} from '../firebaseUtils'; // Assuming firebaseUtils.js is in src

// Accept 'user' prop from App.jsx (can be null if not logged in)
function PlayerPage({ user: currentUser }) {
    const [searchParams] = useSearchParams();
    const [error, setError] = useState('');
    const [videoData, setVideoData] = useState({ likeCount: null, dislikeCount: null, viewCount: null, description: '', title: '', channelName: '', channelIcon: '', subscriberCount: 0 });
    const [likeStatus, setLikeStatus] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [actionLoading, setActionLoading] = useState({ like: false, comment: false });

    // URL Params Reading
    const videoId = useCallback(() => searchParams.get('v') || searchParams.get('video') || null, [searchParams]);
    const initialTitle = searchParams.get('title');
    const initialChannelName = searchParams.get('channel');
    const initialChannelIcon = searchParams.get('icon');
    const initialViews = searchParams.get('v_count') || searchParams.get('views');
    const initialTimeAgo = searchParams.get('t') || searchParams.get('time');
    const videoUrl = searchParams.get('video');
    const currentVideoId = videoId();

    // Effects for Fetching Data & Setup
    useEffect(() => {
        if (!videoUrl || videoUrl === 'INVALID') { setError('No valid video URL provided.'); } else { setError(''); }
        setVideoData({ likeCount: null, dislikeCount: null, viewCount: null, description: '', title: initialTitle || '', channelName: initialChannelName || '', channelIcon: initialChannelIcon || '', subscriberCount: 0 });
        setLikeStatus(null); setComments([]); setNewComment(''); setShowFullDescription(false); setActionLoading({ like: false, comment: false });

        let unsubscribeVideo = () => {};
        let unsubscribeComments = () => {};

        if (currentVideoId) {
            console.log("PlayerPage Effect: Setting up for videoId:", currentVideoId);
            incrementViewCount(currentVideoId);
            if (currentUser) { getLikeStatus(currentVideoId).then(status => setLikeStatus(status)); }
             else { setLikeStatus(null); }
            unsubscribeVideo = listenToVideoData(currentVideoId, (data) => {
                if (data) { setVideoData(prev => ({ ...prev, ...data, likeCount: data.likeCount ?? 0, dislikeCount: data.dislikeCount ?? 0, viewCount: data.viewCount ?? 0 })); }
                 else { console.warn("Video data not found for:", currentVideoId); setVideoData(prev => ({ ...prev, title: prev.title || initialTitle || 'Video Not Found', channelName: prev.channelName || initialChannelName || 'Unknown', description: prev.description || 'No description.' })); }
            });
            unsubscribeComments = listenToComments(currentVideoId, setComments);
            return () => { unsubscribeVideo(); unsubscribeComments(); };
        } else {
             setError('Video ID missing.');
             return;
        }
    }, [currentVideoId, currentUser, initialTitle, initialChannelName, initialChannelIcon]);

    // Handlers
    const handleLikeDislike = async (newStatus) => { /* ... keep same logic ... */ };
    const handleCommentSubmit = async (e) => { /* ... keep same logic ... */ };
    const formatCount = (num) => { /* ... keep same logic ... */ };
    const formatTimestamp = (timestamp) => { /* ... keep same logic ... */ };

    // --- RENDER LOGIC - SINGLE COLUMN ---
    return (
        // This container uses player-page-layout but CSS will style it differently
        <div className="player-page-layout full-width"> {/* ADD 'full-width' class */}

            {/* --- Main Content Area --- */}
            <div className="player-main-content">

                 {/* Video Player Area - Make it large */}
                <div className="video-player-container-full"> {/* Use new class */}
                    {error ? (<p className="player-error">{error}</p>) :
                     videoUrl && videoUrl !== 'INVALID' ? ( <video src={videoUrl} controls autoPlay className="video-player" key={videoUrl}/> ) :
                     (<div className="video-player-placeholder">Loading video...</div>)
                    }
                </div>

                 {/* Video Metadata Area - Below Player */}
                 <div className="video-metadata-container">
                    <h1 className="video-title">{videoData.title || initialTitle || 'Video Title...'}</h1>
                    {/* Actions Row - Below Title */}
                    <div className="video-actions-row">
                         <div className="channel-info"> {/* Channel info */}
                             <img src={videoData.channelIcon || initialChannelIcon || 'https://via.placeholder.com/40'} alt="Channel" className="channel-avatar" />
                             <div className="channel-details">
                                <Link to="#" className="channel-name">{videoData.channelName || initialChannelName || 'Channel'}</Link>
                                <span className="channel-subscribers">{formatCount(videoData.subscriberCount)} subscribers</span>
                             </div>
                             <button className="subscribe-button">Subscribe</button>
                         </div>
                         <div className="action-buttons"> {/* Like/Dislike/Share etc. */}
                            <button className={`action-button like-dislike`} onClick={() => handleLikeDislike('like')} disabled={actionLoading.like || !currentUser} title={currentUser ? "Like" : "Log in to like"}>
                                <i className={`uil ${likeStatus === 'like' ? 'bxs-like' : 'uil-thumbs-up'}`}></i> {formatCount(videoData.likeCount)} <span className="separator"></span> <i className={`uil ${likeStatus === 'dislike' ? 'bxs-dislike' : 'uil-thumbs-down'}`} onClick={(e) => { e.stopPropagation(); handleLikeDislike('dislike'); }} title={currentUser ? "Dislike" : "Log in to dislike"} ></i>
                             </button>
                            <button className="action-button"><i className="uil uil-share"></i> Share</button>
                            <button className="action-button"><i className="uil uil-download-alt"></i> Download</button>
                            <button className="action-button save-button"><i className="uil uil-bookmark"></i> Save</button>
                            <button className="action-button more-button"><i className="uil uil-ellipsis-h"></i></button>
                         </div>
                    </div>
                    {/* Description Box */}
                    <div className={`video-description-box ${showFullDescription ? 'expanded' : ''}`}>
                        <p> <span className="view-count">{formatCount(videoData.viewCount)} views</span> <span className="upload-time">{initialTimeAgo || '...'} ago</span> <span className="video-tags"> #LiveTracking</span> </p>
                        <p className="description-text">{videoData.description || 'Loading description...'} {showFullDescription && " More..."}</p>
                        <button className="show-more-button" onClick={() => setShowFullDescription(!showFullDescription)}> {showFullDescription ? 'Show less' : 'Show more'} </button>
                    </div>
                     {/* Comments Section */}
                    <div className="comments-section">
                        <h2>Comments ({comments.length})</h2>
                        {currentUser ? ( <form onSubmit={handleCommentSubmit} className="comment-form"> {/* ... form ... */} </form> ) : ( <p>Please <Link to="/signup-login">sign in</Link> to comment.</p> )}
                        <div className="comment-list"> {comments.map(comment => ( <div key={comment.id} className="comment-item"> {/* ... comment details ... */} </div> ))} </div>
                    </div>
                 </div>
            </div>
            {/* --- NO Secondary Column Here --- */}
        </div>
    );
}
export default PlayerPage;