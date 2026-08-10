import api from '../../api/client/axios';

import {
  MapRestaurantSearchRequest,
  MapRestaurantSearchResponse,
} from './MapRestaurant';

// ============================================================
// MAP RESTAURANT SERVICE
// ============================================================
//
// This service is used only by MapScreen.
//
// We intentionally do NOT reuse the existing restaurant
// service so the Map implementation remains independent.
// ============================================================

const mapRestaurantService = {

  // ==========================================================
  // SEARCH RESTAURANTS
  // ==========================================================
  //
  // Same backend API used by HomeScreen:
  //
  // POST
  // /api/auth/restaurants/search?page=0&size=20
  //
  // The request body is optional and can contain any supported
  // search/filter values.
  // ==========================================================

  searchRestaurants: (
    page: number = 0,
    size: number = 20,
    request: MapRestaurantSearchRequest = {},
  ) => {

    return api.post<MapRestaurantSearchResponse>(
      `/api/auth/restaurants/search?page=${page}&size=${size}`,
      request,
    );
  },
};


// ============================================================
// EXPORT
// ============================================================

export default mapRestaurantService;