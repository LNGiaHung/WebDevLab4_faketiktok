import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import VideoInfo from './VideoInfo';
import './VideoCard.css';

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      if (autoplay && hasInteracted) {
        videoRef.current.play().catch(error => {
          console.log("Playback failed:", error);
        });
      }
    }
  }, [autoplay, hasInteracted]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' && !showInfo) {
        setShowInfo(true);
      } else if (e.key === 'ArrowLeft' && showInfo) {
        setShowInfo(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showInfo]);

  useEffect(() => {
    const handleCloseAll = () => {
      setShowInfo(false);
    };

    window.addEventListener('closeAllVideoInfo', handleCloseAll);
    return () => window.removeEventListener('closeAllVideoInfo', handleCloseAll);
  }, []);

  const onVideoPress = () => {
    if (!isDragging && !showInfo) {
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
    if (!showInfo) {
      setIsDragging(true);
      setStartY(e.clientY);
      setHasInteracted(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !showInfo) {
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
      if (videoRef.current) {
        videoRef.current.muted = muteStatus;
      }
      return muteStatus;
    });
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
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
      <VideoInfo
        isVisible={showInfo}
        videoData={{
          username,
          description,
          likes,
          comments,
          shares,
          profilePic
        }}
        onClose={handleCloseInfo}
      />
    </div>
  );
};

export default VideoCard;
