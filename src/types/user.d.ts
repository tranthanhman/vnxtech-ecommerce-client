export interface User {
    id?: number;
    name: string;
    email: string;
    avatar?: string;
    role?: string | null;
    dob?: string;
    phoneNumber?: string;
    gender?: string;
  }