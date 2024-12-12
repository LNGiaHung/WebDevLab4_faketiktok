import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './VideoInfo.css';

const VideoInfo = ({ isVisible, videoData, onClose }) => {
  const handleBackClick = () => {
    // Close all video info pages by dispatching a custom event
    window.dispatchEvent(new CustomEvent('closeAllVideoInfo'));
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`video-info-container ${isVisible ? 'visible' : ''}`}>
      <div className="video-info-header">
        <FontAwesomeIcon 
          icon={faArrowLeft} 
          className="back-button"
          onClick={handleBackClick}
        />
        <h2>Video Info</h2>
      </div>
      
      <div className="video-info-content">
        <div className="info-header">
          <img src={videoData.profilePic} alt="Profile" className="info-profile-pic" />
          <h3>@{videoData.username}</h3>
        </div>
        
        <div className="info-stats">
          <div className="info-stat-item">
            <FontAwesomeIcon icon={faClock} />
            <span>Posted 2 hours ago</span>
          </div>
          <div className="info-stat-item">
            <FontAwesomeIcon icon={faCalendar} />
            <span>Original upload: Today</span>
          </div>
        </div>

        <div className="info-description">
          <p>{videoData.description}</p>
        </div>

        <div className="info-hashtags">
          {videoData.description.match(/#\w+/g)?.map((tag, index) => (
            <span key={index} className="hashtag">{tag}</span>
          ))}
        </div>

        <div className="info-engagement">
          <div className="engagement-stat">
            <strong>{videoData.likes}</strong> likes
          </div>
          <div className="engagement-stat">
            <strong>{videoData.comments}</strong> comments
          </div>
          <div className="engagement-stat">
            <strong>{videoData.shares}</strong> shares
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo; 