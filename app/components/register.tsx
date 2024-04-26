"use client"

import React, { useState } from 'react';
import { registerUser } from '../lib/data'; // Import registerUser function
import Link from 'next/link';
import Image from 'next/image';
import Oceanimg from "../../public/ocean-img.jpg"
import Logo from "../../public/Logo-holidaze.jpg"

interface RegisterFormData {
  name: string;
  email: string;
  password: string;

}

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
  });

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await registerUser(formData);

      if (response) {
        console.log("User registered successfully:", response);
        setRegisterSuccess(true); 
        setTimeout(() => {
          window.location.href = "/loggin"; 
        }, 3500);
    } else {
        setRegisterError(true); 
      }
    } catch (error) {
      console.error("Error:", error);
      setRegisterError(true);
    }
  };

  return (
    <div className="flex justify-end items-center min-h-screen bg-white">
  <div className="w-full md:w-1/2 px-4">
    <h1>
    <Image className='flex justify-center' src={Logo} alt='logo' />  
    </h1>
    <h1 className="flex item-center text-3xl text-black font-bold mb-4">Join the Holidaze club</h1>
    {registerSuccess && ( <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>User registered successful! Redirecting...</span>
          </div>
)}
{registerError && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Registration failed. please try again</span>
          </div>
        )}
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email (Username)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="email"
          placeholder="Username (Email)"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <p className="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >Register</button>
    </form>
    {registerSuccess && (
      <div className="text-center text-green-500 font-bold">
      Registration successful! You can now <Link href="/login">Login</Link>.
    </div>
    )}
  </div>
  <div className="hidden md:block w-1/2">
    <Image src={Oceanimg} alt="Registration background" objectFit="cover" />
  </div>
</div>
  );
};
