/**
 * ============================================================
 * MENU SERVICE
 * ============================================================
 *
 * This file contains all API calls related to restaurant menus.
 *
 * We keep API communication here so that:
 *
 * MenuScreen
 *     ↓
 * useMenu
 *     ↓
 * menuRepository
 *     ↓
 * menuService
 *     ↓
 * Axios API
 *
 * The UI should never directly call Axios.
 * ============================================================
 */

import api from '../../client/axios';

import {
  MenuCategoryResponse,
  MenuSearchRequest,
  MenuSearchResponse,
} from './Menu';


const menuService = {

  // ==========================================================
  // GET MENU CATEGORIES
  // ==========================================================
  /**
   * Fetches all menu categories belonging to a restaurant.
   *
   * API:
   *
   * GET /api/menu/category?restaurantId={restaurantId}
   *
   * Example:
   *
   * /api/menu/category?restaurantId=15
   *
   * The Authorization header is handled by the existing
   * Axios request interceptor.
   */
  getCategories: async (
    restaurantId: number,
  ): Promise<MenuCategoryResponse> => {

    const response =
      await api.get<MenuCategoryResponse>(
        `/api/menu/category?restaurantId=${restaurantId}`,
      );

    return response.data;
  },


  // ==========================================================
  // SEARCH MENU ITEMS
  // ==========================================================
  /**
   * Searches menu items using optional filters.
   *
   * API:
   *
   * POST /api/menu/search?page=0&size=10
   *
   * The request body can contain ANY combination of the
   * optional fields defined in MenuSearchRequest.
   *
   * Example:
   *
   * {
   *   restaurantId: 15,
   *   menuCategoryId: 14
   * }
   *
   * Another possible request:
   *
   * {
   *   restaurantId: 15
   * }
   *
   * Another:
   *
   * {
   *   restaurantId: 15,
   *   menuCategoryId: 14,
   *   veg: true
   * }
   */
  searchMenuItems: async (
    page: number = 0,
    size: number = 10,
    request: MenuSearchRequest = {},
  ): Promise<MenuSearchResponse> => {

    const response =
      await api.post<MenuSearchResponse>(
        `/api/menu/search?page=${page}&size=${size}`,
        request,
      );

    return response.data;
  },

};


// ============================================================
// EXPORT
// ============================================================

export default menuService;