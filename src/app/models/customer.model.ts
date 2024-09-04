export interface Customer {
    id?: number;          // Optional, as it may not be present when creating a new customer
fullname: string;
    dob: string ;  // Use `Date` type for better handling of date values
    gender: string;
    phone: string;
    email: string;       // Added the email field if it's part of the customer details
  }
  