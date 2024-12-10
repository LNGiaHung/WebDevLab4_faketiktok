import React from 'react';
import './SharePopup.css';

const SharePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="share-popup-overlay" onClick={onClose}>
      <div className="share-popup" onClick={e => e.stopPropagation()}>
        <div className="share-header">
          <span>Share to</span>
          <button onClick={onClose}>×</button>
        </div>
        <div className="share-list">
          <div className="share-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png" alt="Facebook" />
            <span>Facebook</span>
          </div>
          <div className="share-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="Instagram" />
            <span>Instagram</span>
          </div>
          <div className="share-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Threads_%28app%29.svg/2048px-Threads_%28app%29.svg.png" alt="Threads" />
            <span>Threads</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
