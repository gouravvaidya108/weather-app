import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchComponent.module.css';

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="City"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyPress}
        className={styles.inputField}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchComponent;
