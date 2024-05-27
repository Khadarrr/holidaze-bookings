"use client"
import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile, getVenuesByProfile, getBookingsByProfile } from '../lib/data'; // Assuming data.ts is in the same directory
import { Profile, ProfileUpdate, Venue, Booking } from '../lib/types'; // Assuming types.ts is in the same directory

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]); // State to hold venues
  const [newBio, setNewBio] = useState<string>('');
  const [newAvatarUrl, setNewAvatarUrl] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [bookings, setBookings] = useState<{ data: Booking[] } | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const apiKey = localStorage.getItem('apiKey');
        const username = localStorage.getItem('loggedInUsername');
  
        if (!accessToken || !apiKey || !username) {
          throw new Error('User not authenticated');
        }
  
        // Fetch user profile
        const profileResponse = await getProfile(username, accessToken);
        setProfile(profileResponse);
  
        // Fetch venues by profile
        const venuesResponse = await getVenuesByProfile(username, accessToken);
        setVenues(venuesResponse.data);
  
        // Fetch bookings by profile
        const bookingsResponse = await getBookingsByProfile(username, accessToken);
        if (bookingsResponse !== null) {
          setBookings({ data: bookingsResponse.data });
        } else {
          console.error('Bookings response is null');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  

  const handleUpdateProfile = async () => {
    try {
      // Check for required data before proceeding
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedApiKey = localStorage.getItem('apiKey');
      const storedUsername = localStorage.getItem('loggedInUsername');

      console.log('storedAccessToken:', storedAccessToken);
      console.log('storedApiKey:', storedApiKey);
      console.log('storedUsername:', storedUsername);

      if (!storedAccessToken || !storedApiKey || !storedUsername) {
        throw new Error('Missing required data for profile update. Please login first.');
      }

      const updatedData: ProfileUpdate = {
        bio: newBio,
        avatar: {
          url: newAvatarUrl,
          alt: 'Avatar',
        },
      };

      // Use retrieved values from localStorage
      await updateProfile(storedUsername, updatedData);

      const updatedProfile = await getProfile(storedUsername, storedAccessToken);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      // You can add additional error handling here, like displaying a message to the user
    }
  };

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-4 text-3xl font-bold text-center">Profile</h1>

      {/* Display User Info */}
      {profile && (
  <div className="flex flex-col items-center mb-6">
    {profile.data?.banner && ( // Access banner using data.banner
      <img
        src={profile.data.banner.url}
        alt="Banner"
        height={120}
        className="object-cover w-full h-32 mb-4 rounded-t-lg"
      />
    )}
    {profile.data?.avatar && ( // Access avatar using data.avatar
      <div className="w-32 h-32 mb-4 overflow-hidden rounded-full relative">
        <img
          src={profile.data.avatar.url}
          alt="Avatar"
          className="object-cover w-full h-full rounded-full"
        />
      </div>
    )}
    <div className="text-center">
      <h3 className="text-xl font-semibold">{profile.data.name}</h3>
      <p className="mb-2 text-gray-500">{profile.data.email}</p>
      {isEditing ? (
        <input
          type="text"
          value={newAvatarUrl}
          onChange={(e) => setNewAvatarUrl(e.target.value)}
          placeholder="Enter new avatar URL"
          className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
      ) : (
        <p className="mb-2">{profile.data.bio}</p>
      )}
      {isEditing && (
        <textarea
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          placeholder="Enter new bio"
          className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
      )}
    </div>
  </div>
)}


      {/* Display Venues */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-center">Venues</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <div key={venue.id} className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold">{venue.name}</h3>
              <p className="text-gray-500">{venue.description}</p>
              {/* You can add more venue details here */}
            </div>
          ))}
        </div>
      </div>

      <div>
  <h2 className="mb-4 text-2xl font-bold text-center">Bookings</h2>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {bookings && bookings.data.map((booking) => (
  <div key={booking.data?.id} className="p-4 border rounded-lg">
    <h3 className="text-xl font-semibold">Booking ID: {booking.data?.id}</h3>
    <p>Date From: {booking.data?.dateFrom}</p>
    <p>Date To: {booking.data?.dateTo}</p>
    <p>Guests: {booking.data?.guests}</p>
  </div>
))}
  </div>
</div>

      {/* Edit Profile */}
      {isEditing ? (
        <div className="flex items-center justify-center mb-4 space-x-4">
          <button
            onClick={handleUpdateProfile}
            disabled={!newBio || !newAvatarUrl}
            className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-3 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="flex px-6 py-3 mx-auto text-white rounded-3xl btn btn-primary" // Assuming these styles are defined elsewhere
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
