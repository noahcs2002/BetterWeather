import React, {useState} from "react";
import './SearchBar.scss';
import searchIcon from '../Resources/search-interface-symbol.png'

const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
  
    const handleInputChange = (event) => {
      setSearchText(event.target.value);      
    };
  
    const handleSearchClick = () => {
      onSearch(searchText);
    }

    const handleKeyPress = (event) => {
      if (event.key == 'Enter') {
        handleSearchClick();
      }
    }
  
    return (
      <div className="search-bar-container">
        <input
          id="searchTextField"
          type="text"
          className="search-input"
          placeholder="Search..."
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