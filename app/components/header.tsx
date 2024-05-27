"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../public/Logo-holidaze.jpg';
import Link from 'next/link';
import { Profile } from '../lib/types'; 
import { getProfile } from '../lib/data';
import DefaultPic from "../../public/holizade-image.jpg";
import SearchComponent from './search';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('loggedInUsername');
    const storedApiKey = localStorage.getItem('apiKey'); 

    if (accessToken && username && storedApiKey) {
      setIsLoggedIn(true);
      fetchProfile(username, accessToken);
      setApiKey(storedApiKey); 
    }
  }, []);

  const fetchProfile = async (username: string, accessToken: string) => {
    try {
      const fetchedProfile = await getProfile(username, accessToken);
      setProfile(fetchedProfile);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <Link href="/" className="flex-1">
          <Image src={logo} height={50} alt="logo holidaze" />
          <p className="btn btn-ghost text-black text-xl">Holidaze</p>
        </Link>
        <div className="flex-none gap-2">
          <SearchComponent/>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              {isLoggedIn && profile?.data?.avatar?.url ? (  
                <div className="w-10 rounded-full">
                  <img src={profile.data.avatar.url} alt={profile.data.avatar.alt} width={40} height={40} />
                </div>
              ) : (
                <div className="w-10 rounded-full">
                  <Image src={DefaultPic} alt="Default avatar" width={40} height={40} />
                </div>
              )}
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link href="/profile" className="justify-between"> 
                  Profile
                  <div className="badge">New</div>
                </Link>
              </li>
              <li><a>Venues</a></li>
              <li><Link href="/loggin">Logout</Link></li> 
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
