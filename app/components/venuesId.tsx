"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt?: string }[];
  price: number;
  maxGuests: number;
  meta: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
}

const SingleVenue: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        if (!id) {
          setError('Venue ID not found.');
          setLoading(false);
          return;
        }

        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch venue');
        }

        const data = await response.json();
        console.log('Fetched venue data:', data);

        setVenue(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching venue:', error);
        setError;
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!venue) {
    return <p>Venue not found.</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="group rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transform hover:translate-y-1 transition duration-300 ease-in-out">
        <img
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || ""}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2>{venue.name}</h2>
          <p className="text-gray-500 mb-2">{venue.description}</p>
          <div className="flex justify-between items-center">
            <p className="font-bold">Price: ${venue.price}</p>
          </div>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <p>Max Guests: {venue.maxGuests}</p>
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
      </div>
    </div>
  );
};

export default SingleVenue;
