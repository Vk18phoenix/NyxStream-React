import React from 'react';

// Sample data for the shorts player
const shortsData = [
  {
    id: 1,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-a-man-in-a-suit-works-on-a-laptop-4581-large.mp4',
    channel: { name: 'CricHDShorts-18-07', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_k-v2yv-y-s-Twd8t-1q-4a-4a-4a-4a-4a=s176-c-k-c0x00ffffff-no-rj' },
    title: 'root #cricket #cricketaddict #cricketlover #cricketacadmey #cricketfan #grassrootscricket',
    likes: '67K',
    comments: '256',
    remixes: '349K'
  },
  {
    id: 2,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-under-a-small-waterfall-1021-large.mp4',
    channel: { name: 'NatureVibes', avatar: 'https://i.pravatar.cc/150?img=1' },
    title: 'Finding peace under the waterfall #nature #relax',
    likes: '1.2M',
    comments: '4.5K',
    remixes: '12K'
  },
];

const Shorts = () => {
  return (
    <div className="shorts-page-container">
      {/* These are the top navigation buttons for up/down */}
      <button className="shorts-nav-button up"><i className="uil uil-angle-up"></i></button>
      <button className="shorts-nav-button down"><i className="uil uil-angle-down"></i></button>

      <div className="shorts-carousel">
        {shortsData.map((short) => (
          <div key={short.id} className="short-video-item">
            <video className="short-video-player" src={short.videoUrl} autoPlay loop muted playsInline></video>
            
            {/* The overlay containing all UI elements */}
            <div className="shorts-overlay">
              {/* Top controls inside the video */}
              <div className="shorts-video-controls">
                <button><i className="uil uil-play"></i></button>
                <button><i className="uil uil-volume"></i></button>
                <div className="spacer"></div>
                <button><i className="uil uil-expand-arrows-alt"></i></button>
                <button><i className="uil uil-ellipsis-v"></i></button>
              </div>

              {/* Main content overlay */}
              <div className="shorts-content-overlay">
                {/* Left side: Video Info */}
                <div className="shorts-info">
                  <div className="shorts-channel-info">
                    <img src={short.channel.avatar} alt="channel avatar" className="channel-avatar" />
                    <span className="channel-name">@{short.channel.name}</span>
                    <button className="subscribe-button-shorts">Subscribe</button>
                  </div>
                  <div className="shorts-video-title">{short.title}</div>
                  <div className="shorts-audio-info">
                    <i className="uil uil-music"></i>
                    <span>Iral and Sheykhar, Udit Narayan & Mahalaxmi Iyer</span>
                  </div>
                </div>

                {/* Right side: Action Buttons */}
                <div className="shorts-actions">
                  <button className="short-action-button"><i className='uil uil-thumbs-up'></i><span>{short.likes}</span></button>
                  <button className="short-action-button"><i className='uil uil-thumbs-down'></i><span>Dislike</span></button>
                  <button className="short-action-button"><i className='uil uil-comment'></i><span>{short.comments}</span></button>
                  <button className="short-action-button"><i className='uil uil-share'></i><span>Share</span></button>
                  <button className="short-action-button"><i className='uil uil-creative-commons-pd'></i><span>{short.remixes}</span></button>
                  <img src={short.channel.avatar} alt="channel avatar" className="audio-disc" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shorts;