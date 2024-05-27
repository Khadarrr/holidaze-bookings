"use client"

import React, { useEffect, useState } from 'react';
import { getAllProfiles } from '../lib/data';

interface ProfileData {
  name: string;
  email: string;
  bio?: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
  _count: {
    venues: number;
    bookings: number;
  };
}

const AllProfilesPage = () => {
  const [profiles, setProfiles] = useState<ProfileData[] | null>(null);
  const [visibleProfiles, setVisibleProfiles] = useState<ProfileData[] | null>(null);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken') || '';
        const fetchedData = await getAllProfiles(accessToken);

        if (fetchedData) {
          const profiles = fetchedData.data;
          setProfiles(profiles);
        } else {
          console.error('Error fetching profiles:');
          setProfiles(null);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setProfiles(null);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    if (profiles) {
      setVisibleProfiles(profiles.slice(0, 10));
      setLoadedCount(10);
    }
  }, [profiles]);

  const handleLoadMore = () => {
    if (profiles) {
      const nextBatch = profiles.slice(loadedCount, loadedCount + 10);
      setVisibleProfiles((prevVisibleProfiles) => {
        if (prevVisibleProfiles) {
          return [...prevVisibleProfiles, ...nextBatch];
        }
        return nextBatch;
      });
      setLoadedCount(loadedCount + 10);
    }
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);

    try {
      const accessToken = localStorage.getItem('accessToken') || '';
      const response = await fetch(`/holidaze/profiles/search?q=${value}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to search profiles');
      }
      const searchData = await response.json();
      setVisibleProfiles(searchData.data);
    } catch (error) {
      console.error('Error searching profiles:', error);
    }
  };

  return (
    <div>
      <h1>All Profiles</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search profiles..."
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      />
      {visibleProfiles ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleProfiles.map((profile, index) => (
            <div key={index} className="profile-card bg-white rounded-lg overflow-hidden shadow-md">
              <div className="profile-avatar relative">
                <div className="w-full h-32 bg-cover bg-center" style={{ backgroundImage: `url(${profile.banner.url})` }}></div>
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-gray-200">
                    <img src={profile.avatar.url} alt={profile.avatar.alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="profile-info p-4">
                <h2 className="text-lg font-semibold">{profile.name}</h2>
                <p className="text-gray-600">Email: {profile.email}</p>
              </div>
            </div>
          ))}
          {profiles && loadedCount < profiles.length && (
            <button onClick={handleLoadMore} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">Load More</button>
          )}
        </div>
      ) : (
        <p>Loading profiles...</p>
      )}
    </div>
  );
};

export default AllProfilesPage;
