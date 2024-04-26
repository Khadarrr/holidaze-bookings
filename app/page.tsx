"use client"
import React from 'react';
import Header from "./components/header";
import Venues from "./components/venues";
import HeroSection from './components/hero';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection/>
      <div className="max-w-5xl mx-auto px-8">
        
            <Venues />
    
        
      </div>
    </>
  );
}
