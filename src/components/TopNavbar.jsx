import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = ({ onSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const handleBackClick = () => {
    setShowSearch(false);
    setSearchTerm('');
    onSearch(''); // Reset search when closing
  };

  return (
    <div className={`top-navbar ${showSearch ? 'search-active' : ''}`}>
      {!showSearch ? (
        <>
          <FontAwesomeIcon icon={faTv} className='icon'/>
          <h2>Following |   <span>For You</span></h2>
          <FontAwesomeIcon 
            icon={faSearch} 
            className='icon'
            onClick={() => setShowSearch(true)}
          />
        </>
      ) : (
        <div className="search-overlay">
          <FontAwesomeIcon 
            icon={faArrowLeft} 
            className='icon back-icon'
            onClick={handleBackClick}
          />
          <input
            type="text"
            placeholder="Search hashtags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearch}
            className="search-input"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
