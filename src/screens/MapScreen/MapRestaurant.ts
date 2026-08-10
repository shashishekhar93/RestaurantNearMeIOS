// ============================================================
// MAP RESTAURANT MODEL
// ============================================================
//
// This model is intentionally separate from the existing
// Restaurant model used by HomeScreen.
//
// Keeping a Map-specific model makes debugging easier and
// allows us to add Map-specific fields later without affecting
// the Home screen.
// ============================================================


// ============================================================
// RESTAURANT
// ============================================================

export type MapRestaurant = {

  // ----------------------------------------------------------
  // BASIC RESTAURANT INFORMATION
  // ----------------------------------------------------------

  restaurantId: number;

  restaurantName?: string;

  name?: string;

  imageUrl?: string;

  description?: string;


  // ----------------------------------------------------------
  // LOCATION
  // ----------------------------------------------------------
  //
  // These two fields are required by Google Maps Marker.
  //
  // The API may return them as numbers or strings depending
  // on the backend response, so we allow both here.
  // ----------------------------------------------------------

  latitude?: number;

  longitude?: number;


  // ----------------------------------------------------------
  // RESTAURANT INFORMATION
  // ----------------------------------------------------------

  city?: string;

  address?: string;

  cuisine?: string;

  category?: string;


  // ----------------------------------------------------------
  // RATING
  // ----------------------------------------------------------

  rating?: number;


  // ----------------------------------------------------------
  // OPTIONAL DISTANCE
  // ----------------------------------------------------------
  //
  // If the API provides distance, we can display it on the
  // horizontal restaurant card.
  // ----------------------------------------------------------

  distance?: number | string;


  // ----------------------------------------------------------
  // OTHER OPTIONAL API FIELDS
  // ----------------------------------------------------------
  //
  // These are intentionally optional because the Map screen
  // does not currently depend on them.
  // ----------------------------------------------------------

  phoneNumber?: string;

  openingTime?: string;

  closingTime?: string;

  active?: boolean;

  featured?: boolean;

  createdAt?: string | null;

  updatedAt?: string | null;


  // ----------------------------------------------------------
  // ALLOW ADDITIONAL API FIELDS
  // ----------------------------------------------------------
  //
  // The backend may return additional restaurant properties.
  // We don't need to duplicate every property here just to
  // display the map.
  // ----------------------------------------------------------

  [key: string]: any;
};


// ============================================================
// SEARCH REQUEST
// ============================================================
//
// Every parameter is optional.
//
// This allows us to send:
//
// {}
//
// or:
//
// {
//   keyword: 'pizza'
// }
//
// or:
//
// {
//   city: 'Lucknow'
// }
//
// etc.
// ============================================================

export type MapRestaurantSearchRequest = {

  keyword?: string;

  city?: string;

  latitude?: number;

  longitude?: number;

  radius?: number;

  category?: string;

  cuisine?: string;

  veg?: boolean;

  available?: boolean;

  featured?: boolean;

  [key: string]: any;
};


// ============================================================
// PAGINATION
// ============================================================

export type MapRestaurantPage = {

  index: number;

  size: number;

  total: number;

  count: number;
};


// ============================================================
// SEARCH RESPONSE
// ============================================================

export type MapRestaurantSearchResponse = {

  status: number;

  data: {

    results: MapRestaurant[];

    page: MapRestaurantPage;
  };

  error: string | null;
};