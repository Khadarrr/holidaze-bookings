"use client"

import React, { useState, useEffect } from 'react';
import { fetchVenues } from '../lib/data';
import { Venue } from '../lib/types';



export default function Venues() {
  const [venues, setVenues] = useState<Venue[]>([]); // State to store fetched venues
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status
  const [error, setError] = useState<string | undefined>(undefined); // State to store any error

  // Function to fetch venues using the fetchVenues function
  const fetchVenuesData = async () => {
    setIsLoading(true); // Set loading state to true
    setError(undefined); // Clear any previous error

    try {
      const fetchedVenues = await fetchVenues('your_access_token', 'your_api_key'); // Call the fetchVenues function with access token and API key
      
      if (fetchedVenues !== undefined) {
        setVenues(fetchedVenues); // Update venues state if fetchedVenues is not undefined
      } else {
        // Handle the case when fetchedVenues is undefined
        setVenues([]); // Set venues state to an empty array
        setError('Failed to fetch venues'); // Set error message
      }
    } catch (error) {
      setError('Failed to fetch venues'); // Set error message
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or failure
    }
  };
  
  // Fetch venues on component mount
  useEffect(() => {
    fetchVenuesData();
  }, []); // Empty dependency array ensures fetching only once

  // Render the content based on loading/error states and fetched venues
  return (
    <>
    {isLoading && <p>Loading venues...</p>}
    {error && <p className="error">{error}</p>}
    {venues.length > 0 && (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {venues.map((venue: Venue) => (
          <li
            key={venue.id}
            className="group rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transform hover:translate-y-1 transition duration-300 ease-in-out"
          >
            <img
              src={venue.media[0]?.url}
              alt={venue.media[0]?.alt || ""}
              className="w-full h-48 object-cover"
            /> {/* Fixed image size and aspect ratio */}
            <div className="p-4">
              <h2>{venue.name}</h2>
              <p className="text-gray-500 mb-2">
                {venue.description.length > 100 ? ( // Check if description is longer than 100 characters
                  <>
                    {venue.description.substring(0, 100)} {/* Display first 100 characters */}
                    <span className="text-blue-500 cursor-pointer" onClick={() => console.log("Read More Clicked")}>
                      Read More..
                    </span>
                    <span className="hidden">{venue.description.substring(100)}</span> {/* Hide remaining content initially */}
                  </>
                ) : (
                  venue.description // Display full description if less than 100 characters
                )}
              </p>
              <div className="flex justify-between items-center">
                <p className="font-bold">Price: ${venue.price}</p>
                <div className="flex items-center text-sm">
                  <span className="text-yellow-400 mr-1">&#9733;</span> {/* Star icon (replace with your preferred star component) */}
                  <span>{venue.rating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <p>Max Guests: {venue.maxGuests}</p>
                {/* Additional details (optional) */}
                {venue.meta && (
                  <ul className="flex space-x-2">
                    {venue.meta.wifi && <li>Wi-Fi</li>}
                    {venue.meta.parking && <li>Parking</li>}
                    {venue.meta.breakfast && <li>Breakfast</li>}
                    {venue.meta.pets && <li>Pets Allowed</li>}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    )}
    {venues.length === 0 && !isLoading && <p>No venues found.</p>}
  </>
  
  );
}
