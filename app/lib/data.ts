import { RegisterUserRequest, RegisterUserResponse, LoginRequest, LoginResponse, Venue } from './types';

const NOROFF_API_URL: string = "https://v2.api.noroff.dev";

// Function to create an API key with access token in Authorization header
export const createApiKey = async (accessToken: string): Promise<string | undefined> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      "name": "My API Key name" // Optional: Replace with your desired name
    })
  };

  try {
    const response: Response = await fetch(`${NOROFF_API_URL}/auth/create-api-key`, options);
    if (response.ok) {
      const data: { data: { key: string } } = await response.json();
      const apiKey: string = data.data.key;
      console.log("API Key:", apiKey);
      return apiKey; // You can return the API key if needed
    } else {
      console.error("Failed to create API key:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Function to register a user
export const registerUser = async (userData: RegisterUserRequest): Promise<RegisterUserResponse | undefined> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };

  try {
    const response: Response = await fetch(`${NOROFF_API_URL}/auth/register`, options);
    if (response.ok) {
      const data: RegisterUserResponse = await response.json();
      console.log("User registered successfully:", data);
      return data;
    } else {
      console.error("Failed to register user:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Function to login a user (no local storage)
export const loginUser = async (loginData: LoginRequest): Promise<string | undefined> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  };

  try {
    const response: Response = await fetch(`${NOROFF_API_URL}/auth/login`, options);
    if (response.ok) {
      const data: LoginResponse = await response.json();
      console.log("User logged in successfully:", data);
      return data.data.accessToken; // Return only the access token
    } else {
      console.error("Failed to log in user:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Example function demonstrating using access token in Authorization header
export const fetchPosts = async (accessToken: string, apiKey?: string): Promise<any | undefined> => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      ...(apiKey && { 'X-Noroff-API-Key': apiKey }) // Add X-Noroff-API-Key if apiKey exists
    }
  };

  try {
    const response: Response = await fetch(`${NOROFF_API_URL}/social/posts`, options);
    // ... rest of the logic for handling response
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchVenues = async (accessToken: string, apiKey?: string): Promise<Venue[] | undefined> => {
  const headers: Record<string, string> = {
    'Authorization': `Bearer ${accessToken}`
  };

  // If API key is provided, add it to the headers
  if (apiKey) {
    headers['X-Noroff-API-Key'] = apiKey;
  }

  const options: RequestInit = {
    method: 'GET',
    headers: headers,
  };

  try {
    const response = await fetch(`${NOROFF_API_URL}/holidaze/venues`, options);

    if (response.ok) {
      const data = await response.json();
      const venues: Venue[] = data.data.map((venueData: any) => venueData as Venue); // Assuming proper casting
      return venues;
    } else {
      console.error('Failed to fetch venues:', response.statusText);
      return undefined; // Indicate error
    }
  } catch (error) {
    console.error('Error fetching venues:', error);
    return undefined; // Indicate error
  }
};

