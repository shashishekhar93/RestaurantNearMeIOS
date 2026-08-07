import api from '../../client/axios';
import {
  RestaurantSearchRequest,
  RestaurantSearchResponse,
} from '../../services/restaurantList/Restaurant';

const restaurantService = {
  searchRestaurants: (
    page: number = 0,
    size: number = 10,
    request: RestaurantSearchRequest = {},
  ) =>
    api.post<RestaurantSearchResponse>(
      `/api/auth/restaurants/search?page=${page}&size=${size}`,
      request,
    ),
};

export default restaurantService;