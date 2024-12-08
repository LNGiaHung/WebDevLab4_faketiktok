import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const {url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);

  // useEffect(() => {
  //   if (autoplay) {
  //     videoRef.current.play();
  //   }
  // }, [autoplay]);

  const mouseWhenClick = () => {

  }
  const mouseWhenScroll = () => {

  }
  const mouseWhenUnClick = () => {

  }

  const onVideoPress = () => {
    if(videoRef.current.paused) {
      videoRef.current.play();
    }
    else
    {
      videoRef.current.pause();
    }
  }


  const handleMuteClick = () => {
    setIsMuted((prevMute) => {
      const muteStatus = !prevMute;
      if(videoRef.current) {
        videoRef.current.muted = muteStatus;
      }
      return muteStatus;    // onVolumeChange();
    });
  }

  return (
    <div className = "video">
      <video 
        className = "player" 
        onClick = {onVideoPress} 
        ref = {(ref) => {
          videoRef.current = ref;
          setVideoRef(ref)}}
        loop
        src = {url}
      ></video>
      <div className = " bottom-controls">
        <div className = "footer-left">
          <FooterLeft 
            username = {username}
            description = {description}
            song = {song}
          />
        </div>
        <div className = "footer-right">
          <FooterRight 
            likes = {likes}
            shares = {shares}
            comments = {comments}
            saves = {saves}
            profilePic = {profilePic}
            isMuted = {isMuted}
            handleMuteClick={handleMuteClick}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
