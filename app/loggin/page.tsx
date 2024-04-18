"use client"

import React, { useState, FormEvent } from 'react';
import { loginUser } from '../lib/data';
import Link from 'next/link';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const loginData = {
      email,
      password,
    };

    try {
      const accessToken = await loginUser(loginData);

      if (accessToken) {
        console.log("User logged in successfully:", accessToken);
        setLoginSuccess(true); // Set login success state
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
      } else {
        console.error("Failed to log in user");
        // Handle failed login (e.g., display error message)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username (Email)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="email"
            placeholder="Username (Email)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
          <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </Link>
        </div>
      </form>
      {loginSuccess && (
        <p className="text-green-500 text-center font-bold">Login Successful! Redirecting...</p>
      )}
      {loginSuccess && (
        <Link href="/"className="text-blue-500 hover:text-blue-800 underline">Go to Home
        </Link>
      )}
    </div>
  );
}
