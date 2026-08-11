// ============================================================
// BOOKING TYPES
// ============================================================

export type BookingSeating =
  | 'Indoor'
  | 'Outdoor patio'
  | 'Bar seating'
  | 'Private room';


// ============================================================
// BOOKING DATA
// ============================================================

export type BookingData = {
  // ----------------------------------------------------------
  // RESTAURANT
  // ----------------------------------------------------------

  restaurantId?: string;

  restaurantName: string;

  restaurantCuisine: string;

  restaurantCategory?: string;

  restaurantImage?: string;

  restaurantRating?: number;


  // ----------------------------------------------------------
  // GUESTS
  // ----------------------------------------------------------

  guests: number;


  // ----------------------------------------------------------
  // DATE
  // ----------------------------------------------------------

  date?: string;

  dateLabel?: string;


  // ----------------------------------------------------------
  // TIME
  // ----------------------------------------------------------

  time?: string;


  // ----------------------------------------------------------
  // SEATING
  // ----------------------------------------------------------

  seating?: BookingSeating;


  // ----------------------------------------------------------
  // CUSTOMER DETAILS
  // ----------------------------------------------------------

  fullName?: string;

  mobileNumber?: string;

  email?: string;

  specialRequests?: string;


  // ----------------------------------------------------------
  // POLICY
  // ----------------------------------------------------------

  bookingPolicyAccepted: boolean;
};


// ============================================================
// INITIAL BOOKING DATA
// ============================================================

export const initialBookingData: BookingData = {
  restaurantName: 'The Cozy Kitchen',

  restaurantCuisine: 'Italian · Café',

  restaurantCategory: 'Café',

  restaurantRating: 4.8,

  guests: 2,

  date: undefined,

  dateLabel: undefined,

  time: undefined,

  seating: undefined,

  fullName: '',

  mobileNumber: '',

  email: '',

  specialRequests: '',

  bookingPolicyAccepted: false,
};