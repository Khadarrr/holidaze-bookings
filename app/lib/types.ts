export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
    bio?: string; // Optional
    avatar?: Avatar; // Optional
    banner?: Banner; // Optional
    venueManager?: boolean; // Optional
  }
  
  export interface Avatar {
    url: string;
    alt?: string; // Optional
  }
  
  export interface Banner {
    url: string;
    alt?: string; // Optional
  }
  
  export interface RegisterUserResponse {
    data: {
      name: string;
      email: string;
      bio?: string; // Optional
      avatar?: Avatar; // Optional
      banner?: Banner; // Optional
      venueManager?: boolean; // Optional
    };
    meta: {};
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    data: {
      name: string;
      email: string;
      avatar?: Avatar; // Optional
      banner?: Banner; // Optional
      accessToken: string;
    };
    meta: {};
  }

  export interface Venue {
    id: string;
    name: string;
    description: string;
    media: Array<{ url: string; alt?: string }>;
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: {
      wifi: boolean;
      parking: boolean;
      breakfast: boolean;
      pets: boolean;
    };
    location: {
      address: string;
      city: string;
      zip: string;
      country: string;
      continent: string;
      lat: number;
      lng: number;
    };
    owner?: User; // Optional owner information (if applicable)
    bookings?: Array<Booking>; // Optional bookings for the venue (if applicable)
  }
  
  export interface User {
    name: string;
    email: string;
    bio?: string; // Optional
    avatar?: Avatar; // Optional
    banner?: Banner; // Optional
  }
  
  export interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    customer: User;
  }
   
  