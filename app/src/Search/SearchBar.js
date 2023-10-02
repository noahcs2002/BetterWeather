import React, {useState} from "react";
import './SearchBar.css';
import searchIcon from '../Resources/search-interface-symbol.png'

const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
  
    const handleSearch = () => {
      console.log(searchText);
      // Call the doSearch function with the searchText
      doSearch(searchText);
    };
  
    const doSearch = (text) => {
      // Perform your search logic here
      console.log(`Searching for: ${text}`);
    };
  
    return (
      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="Search Icon"
          className="search-icon"
          onClick={handleSearch}
        />
      </div>
    );
  };
  
  export default SearchBar;