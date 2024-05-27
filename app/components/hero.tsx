"use client";
import Hotel from "../../public/holizade-image.jpg";
import React, { useState, useEffect } from "react";
import Image from "next/image";
// import BookingForm from "./bookingform";
import { fetchVenues } from "../lib/data"; 
import { Venue } from "../lib/types"; 

export default function HeroSection() {
  const [venueId, setVenueId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const fetchedVenues: Venue[] | undefined = await fetchVenues();
        if (fetchedVenues && fetchedVenues.length > 0) {
          setVenueId(fetchedVenues[0].id);
        } else {
          throw new Error('No venues available');
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
        setError;
      }
    };

    fetchVenueData();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!venueId) {
    return <div>Loading...</div>; // Display loading state while fetching venueId
  }

  return (
    <div className="hero mb-10 min-h-screen relative">
      <Image
        src={Hotel}
        alt="Holidaze Image"
        layout="fill" // This makes the image cover the entire div
        objectFit="cover" // Optional: control how image fills container
      />
      <div className="hero-overlay bg-opacity-60 absolute inset-0 bg-black"></div>
      <div className="hero-content text-center text-neutral-content relative z-10">
        <div className="max-w-md mx-auto">
          {/* <BookingForm venueId={venueId} /> */}
        </div>
      </div>
    </div>
  );
}
