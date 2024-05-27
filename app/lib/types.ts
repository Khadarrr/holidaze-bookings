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

    avatar?: Avatar; // Optional
  
  }
  
  export interface Booking {
    venue: any;
    data: {
      id: string;
      dateFrom: string;
      dateTo: string;
      guests: number;
      created: string;
      updated: string;
      customer: User;
      venueId: string;
      venue: Venue;
    };
  }
  

export interface CreateBookingRequest {
  dateFrom: string; // Instance of new Date()
  dateTo: string; // Instance of new Date()
  guests: number;
  venueId: string; // The id of the venue to book
}


export interface CreateBookingResponse {
  data: {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
  };
  meta: Record<string, any>; 
}


  export interface Profile {
    data: {  
      name: string;
      email: string;
      bio?: string; 
      avatar: {
        url: string;
        alt: string;
      };
      banner: {
        url: string;
        alt: string;
      };
      venueManager: boolean;
      _count: {
        venues: number;
        bookings: number;
      };
    };
  }
  
  export interface ProfileUpdate {
    bio?: string;
    avatar?: {
      url: string;
      alt: string;
    };
    banner?: {
      url: string;
      alt: string;
    };
    venueManager?: boolean;
  }
  
  export interface LoginResponseWithApiKey {
    apiKey?: string; // The API key string
  }
   
  interface ProfileData {
    name: string;
    email: string;
    bio?: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
    venueManager: boolean;
    _count: {
      venues: number;
      bookings: number;
    };
  }
  
  export interface ProfileApiResponse {
    data: ProfileData[];
    meta: {
      isFirstPage: boolean;
      isLastPage: boolean;
      currentPage: number;
      previousPage: number | null;
      nextPage: number | null;
      pageCount: number;
      totalCount: number;
    };
  }