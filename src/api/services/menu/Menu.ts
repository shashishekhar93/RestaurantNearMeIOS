/**
 * ============================================================
 * MENU API TYPES
 * ============================================================
 *
 * This file contains only TypeScript interfaces related to
 * restaurant menus.
 *
 * It does NOT contain API calling logic.
 *
 * Keeping models separate makes the API layer easier to
 * understand and maintain.
 * ============================================================
 */

/**
 * ============================================================
 * MENU CATEGORY
 * ============================================================
 *
 * Represents one category returned by:
 *
 * GET /api/menu/category?restaurantId={restaurantId}
 *
 * Example:
 * "Snacks & Beverages"
 * "Main Course"
 * "Desserts"
 */
export type MenuCategory = {
  menuCategoryId: number;

  categoryName: string;

  description: string | null;

  imageUrl: string | null;

  sortOrder: number | null;

  active: boolean;

  restaurantId: number;

  restaurantName: string;

  /**
   * The category API currently returns this as null.
   *
   * We keep it here because the backend may populate it
   * in the future.
   */
  menuItems: MenuItem[] | null;

  totalItems: number | null;

  createdAt: string | null;

  updatedAt: string | null;
};


/**
 * ============================================================
 * MENU ITEM
 * ============================================================
 *
 * Represents one food/drink item returned by:
 *
 * POST /api/menu/search
 */
export type MenuItem = {
  menuItemId: number;

  itemName: string;

  slug: string;

  description: string | null;

  imageUrl: string | null;

  price: number;

  discountedPrice: number | null;

  discountPercentage: number | null;

  calories: string | null;

  preparationTime: number | null;

  veg: boolean;

  spicy: boolean;

  available: boolean;

  featured: boolean;

  stockQuantity: number | null;

  totalOrders: number;

  rating: number;

  restaurantId: number;

  restaurantName: string;

  menuCategoryId: number;

  categoryName: string;

  createdAt: string | null;

  updatedAt: string | null;
};


/**
 * ============================================================
 * MENU SEARCH REQUEST
 * ============================================================
 *
 * Every field is OPTIONAL.
 *
 * This is important because the API should allow requests like:
 *
 * {
 *   restaurantId: 15,
 *   menuCategoryId: 14
 * }
 *
 * But it should also allow:
 *
 * {
 *   restaurantId: 15
 * }
 *
 * Or:
 *
 * {
 *   keyword: "pizza"
 * }
 *
 * Or any combination of the available filters.
 */
export type MenuSearchRequest = {
  keyword?: string;

  restaurantId?: number;

  menuCategoryId?: number;

  veg?: boolean;

  spicy?: boolean;

  available?: boolean;

  featured?: boolean;
};


/**
 * ============================================================
 * MENU SEARCH PAGE
 * ============================================================
 *
 * Pagination information returned by the backend.
 */
export type MenuSearchPage = {
  index: number;

  size: number;

  total: number;

  count: number;
};


/**
 * ============================================================
 * MENU SEARCH DATA
 * ============================================================
 */
export type MenuSearchData = {
  results: MenuItem[];

  page: MenuSearchPage;
};


/**
 * ============================================================
 * MENU CATEGORY RESPONSE
 * ============================================================
 *
 * Response format:
 *
 * {
 *   status: 1,
 *   data: [...],
 *   error: null
 * }
 */
export type MenuCategoryResponse = {
  status: number;

  data: MenuCategory[];

  error: string | null;
};


/**
 * ============================================================
 * MENU SEARCH RESPONSE
 * ============================================================
 *
 * Response format:
 *
 * {
 *   status: 1,
 *   data: {
 *     results: [...],
 *     page: {...}
 *   },
 *   error: null
 * }
 */
export type MenuSearchResponse = {
  status: number;

  data: MenuSearchData;

  error: string | null;
};