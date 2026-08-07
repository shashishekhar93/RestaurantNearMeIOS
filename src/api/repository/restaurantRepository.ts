import restaurantService from '../services/restaurantList/restaurantService';
import {
  RestaurantSearchRequest,
  RestaurantSearchResponse,
} from '../services/restaurantList/Restaurant';

const RestaurantRepository = {
  searchRestaurants: async (
    page: number = 0,
    size: number = 10,
    request: RestaurantSearchRequest = {},
  ): Promise<RestaurantSearchResponse> => {
    const response = await restaurantService.searchRestaurants(
      page,
      size,
      request,
    );
    console.log('Restaurant API Called');
    console.log(response.data);
    return response.data;
  },
};

export default RestaurantRepository;