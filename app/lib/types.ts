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
  