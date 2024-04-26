import Hotel from "../../public/holizade-image.jpg";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero overflow-hidden">
      <div className="relative h-screen md:h-auto flex flex-col items-center justify-center">
        <Image
          className="hero-image mb-10 h-80 bg-cover bg-center bg-no-repeat md:h-[calc(100vh-106px)]"
          src={Hotel}
          alt="hero-image"
        />
        <div className="card mb-10 glass absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center z-10">
          {" "}
          {/* Overlayed search bar */}
          <div className="card  text-center text-white m-10 px-4 md:px-10 z-10 h-auto">
            {" "}
            {/* Centered text, white color, padding, adjust height */}
            <h1 className="text-4xl font-bold mb-4">
              Find Your Dream Escape with Holidaze
            </h1>{" "}
            {/* Replace with your tagline */}
            <p className="text-xl leading-relaxed">
              Explore unique homes and experiences around the world.
            </p>
            <div className="search-bar flex items-center mt-8">
              <input
                type="date"
                className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                placeholder="Check-in Date"
              />
              <input
                type="date"
                className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-2"
                placeholder="Check-out Date"
              />
              <Link
                href="" // Replace with actual search page route
                className="btn btn-primary py-2 px-4 rounded-full text-center ml-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-600"
              >
                Start Your Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
