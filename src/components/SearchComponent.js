// src/SearchComponent.js
import React, { useState } from "react";
import axios from "axios";
import { port } from "../action/user";

const SearchComponent = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
    //   const response = await axios.get("", { params: { q: query } });
      const { data } = await axios.get(`${port}/main/search/${query}`)
      setResults(data);
    } catch (error) {
      console.error("Error fetching location data", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a location"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((result) => (
          <li key={result.place_id} onClick={() => onSelect(result)}>
            {result.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
