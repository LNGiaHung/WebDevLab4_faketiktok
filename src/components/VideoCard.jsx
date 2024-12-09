import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const {url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // Start muted
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Ensure video starts muted
      if (autoplay && hasInteracted) {
        videoRef.current.play().catch(error => {
          console.log("Playback failed:", error);
        });
      }
    }
  }, [autoplay, hasInteracted]);

  const onVideoPress = () => {
    if (!isDragging) {
      setHasInteracted(true);
      if (videoRef.current.paused) {
        videoRef.current.play().catch(error => {
          console.log("Playback failed:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setHasInteracted(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaY = e.clientY - startY;
      if (Math.abs(deltaY) > 50) {
        const container = document.querySelector('.container');
        const currentScroll = container.scrollTop;
        const videoHeight = container.clientHeight;
        
        if (deltaY > 0) {
          container.scrollTo({
            top: currentScroll - videoHeight,
            behavior: 'smooth'
          });
        } else {
          container.scrollTo({
            top: currentScroll + videoHeight,
            behavior: 'smooth'
          });
        }
        setIsDragging(false);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMuteClick = () => {
    setIsMuted((prevMute) => {
      const muteStatus = !prevMute;
      if(videoRef.current) {
        videoRef.current.muted = muteStatus;
      }
      return muteStatus;
    });
  };

  return (
    <div className="video"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}>
      <video 
        className="player" 
        onClick={onVideoPress} 
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        muted={isMuted}
        playsInline
        src={url}
      ></video>
      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft 
            username={username}
            description={description}
            song={song}
          />
        </div>
        <div className="footer-right">
          <FooterRight 
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
            isMuted={isMuted}
            handleMuteClick={handleMuteClick}
            videoUrl={url}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
