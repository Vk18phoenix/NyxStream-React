// src/pages/HomePage.jsx - WITH FULL VIDEO LIST
import React from 'react';
import Sidebar from '../components/Sidebar';
import CategoryList from '../components/CategoryList';
import AdBanner from '../components/AdBanner';
import VideoCard from '../components/VideoCard';

// --- FULL VIDEO DATA ---
const videos = [
    { videoUrl: "https://res.cloudinary.com/demible0l/video/upload/v1745677654/Ve_Kamleya___Rocky_Aur_Rani_Kii_Prem_Kahaani___Ranveer___Alia___Pritam___Amitabh___Arijit___Shreya_2K_HD_cqp8ic.webm", thumbnailUrl: "https://i.ytimg.com/vi/GkJ_wZy0iB4/maxresdefault.jpg", duration: "4:07", iconUrl: "https://yt3.googleusercontent.com/kOATVFtx9eqbZZNBjMJykcZoP3DeNh4OR8Vwimn8141yI6--rPJH5hcHMrnwmCHjYE5iJcLzLBo=s900-c-k-c0x00ffffff-no-rj", title: 'Ve Kamleya (From "Rocky Aur Rani Kii Prem Kahaani")', channelName: "Saregama Music", views: "34M views", timeAgo: "1 year ago" },
    { videoUrl: "#", thumbnailUrl: "https://m.media-amazon.com/images/S/pv-target-images/407e66050936f9b996ea97dff072c22606ded1e5e53bb18ad9b4678ee68b1d93.jpg", duration: "2:29", iconUrl: "https://yt3.googleusercontent.com/CvgBA1ypUZNxOjiCX0l1V2FbAm7oSDPZE4YkMvkpT_4iLXQ3IXWVtBgWnznHxgtcUoj50TXqZA=s900-c-k-c0x00ffffff-no-rj", title: "The Good Doctor – Official Trailer", channelName: "Netflix", views: "2.5M Views", timeAgo: "7 years ago" },
    { videoUrl: "#", thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/f/f3/Aashiqui_2_%28Poster%29.jpg", duration: "2:12:00", iconUrl: "https://yt3.googleusercontent.com/ukiLOR2xcRjb4vEfv_DvcTU-5WgGyhwL3w1jQxvTBVdMbBlrtDopxKwg8Scs66C8nFgXu-cl=s900-c-k-c0x00ffffff-no-rj", title: "Aashiqui 2 New Released Full Hindi Dubbed Romantic Movie | Aditya Roy Kapur | Shraddha Kapoor", channelName: "Yash Raj films", views: "275M Views", timeAgo: "5 years ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/5ADJjzU17Uk/maxresdefault.jpg", duration: "4:18", iconUrl: "https://yt3.googleusercontent.com/CvgBA1ypUZNxOjiCX0l1V2FbAm7oSDPZE4YkMvkpT_4iLXQ3IXWVtBgWnznHxgtcUoj50TXqZA=s900-c-k-c0x00ffffff-no-rj", title: "The 100 - Season 1 Trailer", channelName: "Netflix", views: "57K Views", timeAgo: "5 years ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/Zo5kxK4j2qY/maxresdefault.jpg", duration: "4:46", iconUrl: "https://yt3.googleusercontent.com/kOATVFtx9eqbZZNBjMJykcZoP3DeNh4OR8Vwimn8141yI6--rPJH5hcHMrnwmCHjYE5iJcLzLBo=s900-c-k-c0x00ffffff-no-rj", title: "Mandaara Video Song | Bhaagamathie | Anushka | Shreya Ghoshal | Thaman S", channelName: "Saregama Music", views: "214M Views", timeAgo: "4 years ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/Etkd-07gnxM/maxresdefault.jpg", duration: "16:24", iconUrl: "https://yt3.googleusercontent.com/VunTf0NzCeboiPjbesBdnQuxaF3Lja7UGRbBGQAWRJgMSTj9TTLO3pS1X9qPOJGCNnmPrXeY=s900-c-k-c0x00ffffff-no-rj", title: "Dunki: O Maahi (Full Video) | Shah Rukh Khan | Taapsee Pannu | Pritam | Arijit Singh | Irshad Kamil", channelName: "T-Series", views: "193M Views", timeAgo: "1 year ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/sBEvEcpnG7k/maxresdefault.jpg", duration: "1:19", iconUrl: "https://yt3.googleusercontent.com/CvgBA1ypUZNxOjiCX0l1V2FbAm7oSDPZE4YkMvkpT_4iLXQ3IXWVtBgWnznHxgtcUoj50TXqZA=s900-c-k-c0x00ffffff-no-rj", title: "Stranger Things 4 | Volume 2 Trailer | Netflix", channelName: "Netflix", views: "2.85M Views", timeAgo: "2 years ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/hooy-UYzvDw/maxresdefault.jpg", duration: "10:34", iconUrl: "https://yt3.googleusercontent.com/pgE1VJCvsk-guws_6-47TGDH1JzCtbx0OnVpA-ngNgzr-Ii82LUDv0vPFSpYoR2FNbWSDGIBn1o=s900-c-k-c0x00ffffff-no-rj", title: "CSK vs RCB Match 8 Review | IPL 2025", channelName: "SKB Shots", views: "52K Views", timeAgo: "5 days ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/WOZSI2_m-3o/maxresdefault.jpg", duration: "2:59", iconUrl: "https://yt3.googleusercontent.com/3jFh1gFXByR47e7VLyE6TOkRCXEqUbw2CIgH5kIJt2NzGeDP-qvGvwQMrZi9nVQmkEAjA_X8UQ=s900-c-k-c0x00ffffff-no-rj", title: "Alan Walker, Sofiloud - Team Side feat. RCB (Official Music Video)", channelName: "Royal Challengers Bengaluru", views: "46.6M Views", timeAgo: "11 months ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/68wSTlrw_RQ/maxresdefault.jpg", duration: "2:43:27", iconUrl: "https://yt3.googleusercontent.com/63BY-qOZNyAd-Tssfm0AfMEngVlRp16j4-4D95Qkjdtw90DxqVVaNiY5m2cFDqYj6xb7meUBVA=s900-c-k-c0x00ffffff-no-rj", title: "Jalsa Telugu Full Movie || Pawan kalyan , Ileana D'Cruz", channelName: "Geetha Arts", views: "28M Views", timeAgo: "9 years ago" },
    { videoUrl: "#", thumbnailUrl: "https://ntvb.tmsimg.com/assets/p10700229_b_h10_aa.jpg?w=960&h=540", duration: "2:08", iconUrl: "https://yt3.googleusercontent.com/PguboM9vSKTasgv_PYhxIwRCrhpIa6qEkccsJT3cxlCnVCR0AU3O0YYfL-XSkWMCvwF5TvZx=s900-c-k-c0x00ffffff-no-rj", title: "The Vampire Diaries Season 1 Trailer", channelName: "Prime Video", views: "8.3M Views", timeAgo: "7 years ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/taRBVfDRukY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCD9RZ8NPLhWgTgpOIwnMgcaCHXdQ", duration: "3:22", iconUrl: "https://yt3.googleusercontent.com/kOATVFtx9eqbZZNBjMJykcZoP3DeNh4OR8Vwimn8141yI6--rPJH5hcHMrnwmCHjYE5iJcLzLBo=s900-c-k-c0x00ffffff-no-rj", title: "Tum Kya Mile - Rocky Aur Rani Kii Prem Kahaani | Ranveer | Alia | Pritam | Amitabh | Arijit | Shreya", channelName: "Saregama Music", views: "133M Views", timeAgo: "1 year ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/tSIk1QvIM2E/maxresdefault.jpg", duration: "2:56", iconUrl: "https://yt3.googleusercontent.com/SdHhEkdZ78QM2SNYjgSRnJX_F-ulIdb-B001bxuTfzLX7rbfuEeO_GXaynLc2zp-LZQizNEB=s160-c-k-c0x00ffffff-no-rj", title: "Selena Gomez - Boyfriend (Official Video)", channelName: "Selena Gomez", views: "35.2M views", timeAgo: "4 years ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/tnuwqRcgzps/maxresdefault.jpg", duration: "2:13:00", iconUrl: "https://yt3.googleusercontent.com/hveNxxK5rf19e1iiBbRLIwuHzhHXzvl2ek83P6l9paUx-LxQG5QrlvmB35BeXNiDlqv1yHJy=s900-c-k-c0x00ffffff-no-rj", title: "Kis Kisko Pyaar Karoon | Hindi Comedy Movie | Kapil Sharma | Varun Sharma | Hindi Movies 2023", channelName: "Venus Movies", views: "45.2M views", timeAgo: "2 years ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/tpJuuhVMhT0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAC1YMvIf74jRm_Fd32BXRPVBIeCA", duration: "1:59:00", iconUrl: "https://yt3.googleusercontent.com/xjnenDsZ-6TiNsE13A2Vggxfg0Np7IOtvA5_AaH26QrVelAkRqkWfKVPjemuuq9JN25ppTk-mA=s900-c-k-c0x00ffffff-no-rj", title: "Jumanji: Welcome to the Jungle Full Movie", channelName: "Sony Pictures Entertainment", views: "57.2M views", timeAgo: "7 years ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/VfrhPn88Q0c/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC2xCOTYzSH6I9zFRumqD9tM2tXEg", duration: "3:27", iconUrl: "https://yt3.googleusercontent.com/JEPckdG7X65nuD3H2IU2QTNzLTWrTRNHXwvpSLQAFsyWvlSGAsTXGHDa_tXJXHQR3jwzmyqb2b4=s900-c-k-c0x00ffffff-no-rj", title: "Sree Vishnu Is A Rakhi Bhai😂 | Samajavaragamana Movie Best Scenes | Reba Monica | Telugu New Movies", channelName: "aha videoIN", views: "27k views", timeAgo: "1 day ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/ZiI79n84UIY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAJyIdiZ6Bvwxyt3lJSzkruYsxTPg", duration: "3:10", iconUrl: "https://yt3.googleusercontent.com/JEPckdG7X65nuD3H2IU2QTNzLTWrTRNHXwvpSLQAFsyWvlSGAsTXGHDa_tXJXHQR3jwzmyqb2b4=s900-c-k-c0x00ffffff-no-rj", title: "Teja And Anandhi's Romantic Moments | Zombie Reddy Movie Scene | Latest Telugu Movies | Aha", channelName: "aha videoIN", views: "8.8K views", timeAgo: "4 days ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/UgMMqFU7lxI/maxresdefault.jpg", duration: "12:55", iconUrl: "https://yt3.googleusercontent.com/vmmZsYmryt238vqck4KAYf69gOSu22ZfqVE3rwT1tYz4hr68xl7crIUK7kghQgR6RiB9IlQ5mQ=s900-c-k-c0x00ffffff-no-rj", title: "'Ve Kamleya' पर Shreya ने चलाया अपने सुरों का Magic | Indian Idol S15 | Best Moments", channelName: "SET India", views: "1.7M views", timeAgo: "1 month ago" },
    { videoUrl: "#", thumbnailUrl: "https://i1.sndcdn.com/artworks-TJ9paU39zz72ugbl-5ScZWA-t1080x1080.jpg", duration: "3:18", iconUrl: "https://yt3.googleusercontent.com/SdHhEkdZ78QM2SNYjgSRnJX_F-ulIdb-B001bxuTfzLX7rbfuEeO_GXaynLc2zp-LZQizNEB=s160-c-k-c0x00ffffff-no-rj", title: "Wolves", channelName: "Selena Gomez", views: "161M Views", timeAgo: "6 years ago" },
    { videoUrl: "#", thumbnailUrl: "https://i.ytimg.com/vi/x4O3c7MQNxY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAYytQX9ha8so9mshzYQbt6hKERhg", duration: "15:14", iconUrl: "https://yt3.googleusercontent.com/Q_b1-zqLaVAIa6cFby_vlk6gVKD8mpDlPM1lYaLBf5yPy3xt6Ev7YOrA_fAOubIYzJuTHTd55Q=s900-c-k-c0x00ffffff-no-rj", title: "Oka Majnu Kosam | Episode - 7 | Viraajitha | Sidhu Diwakar | Telugu Web Series | Infinitum Media", channelName: "Infinitum Theatre", views: "216K views", timeAgo: "5 days ago" },
];
// --- END FULL VIDEO DATA ---


function HomePage({ isSidebarHidden, closeSidebar, toggleSidebar }) {
  return (
    // This component assumes it's rendered INSIDE the .standard-layout-wrapper
    // And it provides the .main-layout structure
    <main className="main-layout">

      {/* Screen Overlay */}
      {!isSidebarHidden && <div className="screen-overlay" onClick={closeSidebar}></div>}

      {/* --- SIDEBAR --- */}
      <Sidebar toggleSidebar={toggleSidebar} />

      {/* --- CONTENT WRAPPER --- */}
      <div className="content-wrapper">

        <CategoryList />

        <AdBanner />

        {/* --- VIDEO LIST - Using FULL data --- */}
        <div className="video-list">
          {videos.map((video, index) => (
            <VideoCard
              // --- Use a more reliable key if possible ---
              // If videoUrl is unique (and not '#'), use it. Otherwise, use index.
              key={video.videoUrl && video.videoUrl !== '#' ? video.videoUrl : `${video.title}-${index}`}
              videoUrl={video.videoUrl}
              thumbnailUrl={video.thumbnailUrl}
              duration={video.duration}
              iconUrl={video.iconUrl}
              title={video.title}
              channelName={video.channelName}
              views={video.views}
              timeAgo={video.timeAgo}
            />
          ))}
        </div> {/* --- END VIDEO LIST --- */}

      </div> {/* --- END CONTENT WRAPPER --- */}

    </main> /* --- END MAIN LAYOUT --- */
  );
}

export default HomePage;