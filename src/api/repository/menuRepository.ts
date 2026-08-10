/**
 * ============================================================
 * MENU REPOSITORY
 * ============================================================
 *
 * The Repository acts as a bridge between:
 *
 *     UI / Hook
 *          ↓
 *     Repository
 *          ↓
 *     Service
 *          ↓
 *         API
 *
 * The repository is intentionally simple.
 *
 * It does not contain UI logic.
 * It does not contain pagination state.
 * It does not modify the API request.
 *
 * Its only responsibility is to expose menu-related
 * API operations to the rest of the application.
 * ============================================================
 */

import menuService from '../services/menu/menuService';

import {
  MenuCategoryResponse,
  MenuSearchRequest,
  MenuSearchResponse,
} from '../services/menu/Menu';


const MenuRepository = {

  // ==========================================================
  // GET RESTAURANT MENU CATEGORIES
  // ==========================================================
  /**
   * Gets all categories for a particular restaurant.
   *
   * restaurantId comes directly from the Restaurant object
   * selected on the HomeScreen.
   */
  getCategories: async (
    restaurantId: number,
  ): Promise<MenuCategoryResponse> => {

    return await menuService.getCategories(
      restaurantId,
    );
  },


  // ==========================================================
  // SEARCH MENU ITEMS
  // ==========================================================
  /**
   * Gets menu items for a restaurant/category.
   *
   * All request parameters are optional.
   *
   * This allows us to make requests such as:
   *
   * {
   *   restaurantId: 15
   * }
   *
   * or:
   *
   * {
   *   restaurantId: 15,
   *   menuCategoryId: 14
   * }
   *
   * Pagination is handled using page and size.
   */
  searchMenuItems: async (
    page: number = 0,
    size: number = 10,
    request: MenuSearchRequest = {},
  ): Promise<MenuSearchResponse> => {

    return await menuService.searchMenuItems(
      page,
      size,
      request,
    );
  },

};


// ============================================================
// EXPORT
// ============================================================

export default MenuRepository;