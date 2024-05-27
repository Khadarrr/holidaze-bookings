import React, { useState } from 'react';
import { searchVenues } from '../lib/data';
import { Venue } from '../lib/types'; 

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Venue[]>([]);

  const handleSearch = async () => {
    try {
      // Fetch venues based on the search query
      const response = await searchVenues(searchQuery);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching venues:', error);
    }
  };

  return (
    <div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        {/* Display search results */}
        {searchResults.map((venue) => (
          <div key={venue.id}>
            <h3>{venue.name}</h3>
            <p>{venue.description}</p>
            {/* Display more venue details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
