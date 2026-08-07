export interface RestaurantSearchRequest {
  restaurantId?: number;
  keyword?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  radiusInKm?: number;
  cuisine?: string;
  priceRange?: string;
  pureVeg?: boolean;
  verified?: boolean;
  featured?: boolean;
  openNow?: boolean;
  deliveryAvailable?: boolean;
  dineInAvailable?: boolean;
  pickupAvailable?: boolean;
  tableBookingAvailable?: boolean;
  minRating?: number;
  maxRating?: number;
  minReviews?: number;
  status?: string;
  sortBy?: string;
  sortDirection?: string;
  active?: boolean;
  isDeleted?: number;
}

export interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  slug: string;

  description: string;

  logoUrl: string;
  coverImageUrl: string;

  mobile: string;
  alternateMobile: string;

  email: string;
  website: string;

  cuisine: string;
  priceRange: string;

  address: string;
  landmark: string;

  city: string;
  state: string;
  country: string;
  pincode: string;

  latitude: number;
  longitude: number;

  openingTime: string;
  closingTime: string;

  openNow: boolean | null;

  averageCost: number | null;
  deliveryCharge: number | null;
  preparationTime: number | null;

  deliveryAvailable: boolean;
  dineInAvailable: boolean;
  pickupAvailable: boolean;
  tableBookingAvailable: boolean;

  pureVeg: boolean;
  verified: boolean;
  featured: boolean;

  rating: number;
  totalReviews: number;
  totalOrders: number;
  totalFollowers: number;
  totalViews: number;

  status: string;
  ownerId: number;
  fullName: string;

  menuCategories: any[];

  createdAt: number;
}

export interface RestaurantPage {
  index: number;
  size: number;
  total: number;
  count: number;
}

export interface RestaurantSearchResponse {
  status: number;

  data: {
    results: Restaurant[];
    page: RestaurantPage;
  };

  error: string | null;
}