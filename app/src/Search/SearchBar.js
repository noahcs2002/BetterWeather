import React, {useEffect, useState} from "react";
import './SearchBar.scss';
import searchIcon from '../Resources/search-interface-symbol.png'

/**
 * Handle searching in the search bar.
 * @param {*} The function for search handling.
 * @returns React Module to display
 * @author Noah Sternberg
 * @since V1.0.0
 */
const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
  
    const handleInputChange = (event) => {
        setSearchText(event.target.value);         
    };
  
    const handleSearchClick = () => {
      onSearch(searchText);
    }

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearchClick();
      }
    }

    const samples = [
      'e.g. Lexington, KY',
      'e.g. Murray, KY',
      'e.g. Seattle, WA',
      'e.g. Portland',
      'e.g. Mount Carmel',
      'e.g. Evansville',
      'e.g. New York City, NY',
      'e.g. Chicago, IL',
      'e.g. Palm Beach, FL',
      'e.g. Fairbanks'
    ]
    const placeholder = samples[Math.floor(Math.random() * 10)];
    
    return (
      <div className="search-bar-container">
        <input
          id="searchTextField"
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <img
          src={searchIcon}
          alt="Search Icon"
          className="search-icon"
          onClick={handleSearchClick}
          width={25}
        />
      </div>
    );
  };
  
  export default SearchBar;