import mapRestaurantService from './mapRestaurantService';

import {
  MapRestaurantSearchRequest,
  MapRestaurantSearchResponse,
} from './MapRestaurant';

// ============================================================
// MAP RESTAURANT REPOSITORY
// ============================================================
//
// Repository sits between the hook and the API service.
//
// MapScreen
//    ↓
// useMapRestaurants
//    ↓
// mapRestaurantRepository
//    ↓
// mapRestaurantService
//    ↓
// API
//
// This remains completely separate from the existing
// RestaurantRepository used by HomeScreen.
// ============================================================

const mapRestaurantRepository = {

  // ==========================================================
  // SEARCH RESTAURANTS
  // ==========================================================

  searchRestaurants: async (
    page: number = 0,
    size: number = 20,
    request: MapRestaurantSearchRequest = {},
  ): Promise<MapRestaurantSearchResponse> => {

    // --------------------------------------------------------
    // Call Map-specific API service
    // --------------------------------------------------------

    const response =
      await mapRestaurantService.searchRestaurants(
        page,
        size,
        request,
      );


    // --------------------------------------------------------
    // Debug logs
    // --------------------------------------------------------
    //
    // These are useful while building the Map screen.
    // We can remove them later after everything is stable.
    // --------------------------------------------------------

    console.log(
      'Map Restaurant API Called',
    );

    console.log(
      response.data,
    );


    // --------------------------------------------------------
    // Return only the API response body
    // --------------------------------------------------------

    return response.data;
  },
};


// ============================================================
// EXPORT
// ============================================================

export default mapRestaurantRepository;