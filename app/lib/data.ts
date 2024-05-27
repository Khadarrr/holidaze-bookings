import { RegisterUserRequest, RegisterUserResponse, LoginRequest, LoginResponse, Venue, Booking, Profile, ProfileUpdate, LoginResponseWithApiKey, ProfileApiResponse  } from './types';

const NOROFF_API_URL: string = "https://v2.api.noroff.dev";


export const createApiKey = async (accessToken: string): Promise<string | null> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name: "apiKey" }),
  };

  try {
    const response = await fetch(`${NOROFF_API_URL}/auth/create-api-key`, options);

    if (response.ok) {
      const apiKeyData = await response.json();
      const apiKey = apiKeyData.data?.key;

      if (apiKey) {
        localStorage.setItem('apiKey', apiKey);
        return apiKey;
      } else {
        console.error("API key not found in response:", apiKeyData);
        return null;
      }
    } else {
      const errorText = await response.text();
      console.error("Failed to create API key:", response.statusText, errorText);
      return null;
    }
  } catch (error) {
    console.error("Error creating API key:", error);
    return null;
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



export const loginUser = async (loginData: LoginRequest): Promise<LoginResponseWithApiKey | null> => {
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

      // Extract access token and logged-in username after parsing response
      const accessToken = data.data?.accessToken;
      const loggedInUsername = data.data?.name; // Use name for username

      // Store access token in local storage (if present)
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }

      // Store logged-in username in local storage (if present)
      if (loggedInUsername) {
        localStorage.setItem('loggedInUsername', loggedInUsername);
      }

      // Retrieve the API key after successful login
      if (accessToken) {
        const apiKey = await createApiKey(accessToken);
        if (apiKey) {
          // Include the API key in the response
          const responseData: LoginResponseWithApiKey = {
            ...data.data,
            apiKey: apiKey,
          };
          return responseData; // Return combined response object
        } else {
          // Handle case where creating API key fails
          console.error("Failed to retrieve API key.");
          return null;
        }
      } else {
        // Handle case where access token is missing
        console.error("Access token is missing.");
        return null;
      }
    } else {
      console.error("Failed to log in user:", response.statusText);
      return null; // Indicate login failure due to unsuccessful HTTP response
    }
  } catch (error) {
    console.error("Error:", error);
    return null; // Indicate login failure in case of errors
  }
};




export const getProfile = async (username: string, accessToken: string): Promise<Profile | null> => {
  const storedApiKey = localStorage.getItem('apiKey');
  if (!accessToken || !storedApiKey) {
    throw new Error('Missing access token or API key. Please login first.');
  }

  const apiUser = `${NOROFF_API_URL}/holidaze/profiles/${username}`; // Updated endpoint path
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, 
      "X-Noroff-API-Key": storedApiKey
    },
  };

  try {
    const response = await fetch(apiUser, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile. Status: ${response.status}`);
    }

    const userProfile = await response.json(); 

return userProfile;

  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};


export const getAllProfiles = async (accessToken: string): Promise<ProfileApiResponse | null> =>  {
  const storedApiKey = localStorage.getItem('apiKey');
  const storedAccessToken = localStorage.getItem('accessToken'); // Add this line

  if (!accessToken || !storedApiKey || !storedAccessToken) {
    throw new Error('Missing access token or API key. Please login first.');
  }

  const apiEndpoint = `${NOROFF_API_URL}/holidaze/profiles`;
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storedAccessToken}`, // Use stored access token
      'X-Noroff-API-Key': storedApiKey,
    },
  };

  try {
    const response = await fetch(apiEndpoint, options);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Please check your access token and try again.');
      }
      throw new Error(`Failed to fetch profiles. Status: ${response.status}`);
    }

    const data = await response.json();
    return data as ProfileApiResponse;

  } catch (error) {
    console.error('Error fetching profiles:', error);
    return null;
  }
};

export const updateProfile = async (userName: string, updatedData: ProfileUpdate): Promise<any> => {
  const storedAccessToken = localStorage.getItem('accessToken');
  const storedApiKey = localStorage.getItem('apiKey');
  if (!storedAccessToken || !storedApiKey) {
    throw new Error('Missing access token or API key. Please login first.');
  }

  const URL = `${NOROFF_API_URL}/holidaze/profiles/${userName}`;
  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedAccessToken}`,
      "X-Noroff-API-Key": storedApiKey
    },
    body: JSON.stringify(updatedData),
  };

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error(`Failed to update profile. Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};


export const fetchBookings = async (): Promise<Booking[] | undefined> => {
  const storedAccessToken = localStorage.getItem('accessToken');
  const storedApiKey = localStorage.getItem('apiKey');
  if (!storedAccessToken || !storedApiKey) {
    throw new Error('Missing access token or API key. Please login first.');
  }

  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${storedAccessToken}`,
      'X-Noroff-API-Key': storedApiKey
    }
  };

  try {
    const response = await fetch(`${NOROFF_API_URL}/holidaze/bookings`, options);

    if (response.ok) {
      const data = await response.json();
      const bookings: Booking[] = data.data.map((bookingData: any) => bookingData as Booking);
      return bookings;
    } else {
      console.error('Failed to fetch bookings:', response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return undefined;
  }
};

export const createBooking = async (bookingData: {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venueId: string; // Add venueId to the booking data
}): Promise<Booking | undefined> => {
  const storedAccessToken = localStorage.getItem('accessToken');
  const storedApiKey = localStorage.getItem('apiKey');
  if (!storedAccessToken || !storedApiKey) {
    throw new Error('Missing access token or API key. Please login first.');
  }

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${storedAccessToken}`,
      'X-Noroff-API-Key': storedApiKey
    },
    body: JSON.stringify(bookingData)
  };

  try {
    const response = await fetch(`${NOROFF_API_URL}/holidaze/bookings`, options);

    if (response.ok) {
      const data = await response.json();
      return data.data as Booking;
    } else {
      console.error('Failed to create booking:', response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    return undefined;
  }
};


export const fetchVenues = async (): Promise<Venue[] | undefined> => {
  const storedAccessToken = localStorage.getItem('accessToken');
  const storedApiKey = localStorage.getItem('apiKey');
  if (!storedAccessToken || !storedApiKey) {
    throw new Error('Missing access token or API key. Please login first.');
  }

  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${storedAccessToken}`,
      'X-Noroff-API-Key': storedApiKey
    }
  };

  try {
    const response = await fetch(`${NOROFF_API_URL}/holidaze/venues`, options);

    if (response.ok) {
      const data = await response.json();
      const venues: Venue[] = data.data.map((venueData: any) => venueData as Venue);
      return venues;
    } else {
      console.error('Failed to fetch venues:', response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching venues:', error);
    return undefined;
  }
};

export const getVenuesByProfile = async (username: string, accessToken: string): Promise<{ data: Venue[] }> => {
  const storedApiKey = localStorage.getItem('apiKey');
  if (!accessToken || !storedApiKey) {
    throw new Error('Missing access token or API key. Please login first.');
  }

  const apiUrl = `${NOROFF_API_URL}/holidaze/profiles/${username}/venues`; // Endpoint for fetching venues by profile
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, 
      "X-Noroff-API-Key": storedApiKey
    },
  };

  try {
    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch venues by profile. Status: ${response.status}`);
    }

    const venuesData = await response.json();
    return venuesData;

  } catch (error) {
    console.error("Error fetching venues by profile:", error);
    throw error;
  }
};

export const getBookingsByProfile = async (username: string, accessToken: string): Promise<{ data: Booking[] } | null> => {
  const storedApiKey = localStorage.getItem('apiKey');
  if (!accessToken || !storedApiKey) {
    throw new Error('Missing access token or API key. Please login first.');
  }

  const apiEndpoint = `${NOROFF_API_URL}/holidaze/profiles/${username}/bookings`;
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': storedApiKey,
    },
  };

  try {
    const response = await fetch(apiEndpoint, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch bookings for profile. Status: ${response.status}`);
    }

    const bookingsData = await response.json();
    return bookingsData as { data: Booking[] };
  } catch (error) {
    console.error('Error fetching bookings for profile:', error);
    return null;
  }
};


export const searchVenues = async (query: string): Promise<{ data: Venue[] }> => {
  const storedApiKey = localStorage.getItem('apiKey');
  if (!storedApiKey) {
    throw new Error('API key not found. Please login first.');
  }

  const apiEndpoint = `${NOROFF_API_URL}/holidaze/venues/search?q=${encodeURIComponent(query)}`;
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': storedApiKey,
    },
  };

  try {
    const response = await fetch(apiEndpoint, options);

    if (!response.ok) {
      throw new Error(`Failed to search venues. Status: ${response.status}`);
    }

    const searchData = await response.json();
    return searchData as { data: Venue[] };
  } catch (error) {
    console.error('Error searching venues:', error);
    throw new Error('Failed to search venues. Please try again.');
  }
};

export async function fetchVenueById(id: string): Promise<Venue | null> {
  try {
    // Extract just the ID from the URL
    const venueId = id.split('/venues/')[1]; // Assuming the ID is after '/venues/'

    const response = await fetch(`/holidaze/venues/${venueId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch venue');
    }
    const data = await response.json();
    return data.data; // Assuming the venue object is nested under "data"
  } catch (error) {
    console.error('Error fetching venue:', error);
    return null;
  }
}
