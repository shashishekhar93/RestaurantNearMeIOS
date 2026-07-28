import PlaceholderImage from '../../assets/icons/ic_placeholder.svg';

export type Voucher = {
  id: string;
  title: string;
  code: string;
  expiry: string;
};

export type StampReward = {
  id: string;
  restaurant: string;
  subtitle: string;
  completed: number;
  total: number;
  image: any;
};

export const vouchers: Voucher[] = [
  {
    id: '1',
    title: '20% off your next order',
    code: 'WARM20',
    expiry: 'Expires in 5 days',
  },
  {
    id: '2',
    title: 'Free delivery this weekend',
    code: 'FREEDEL',
    expiry: 'Expires Sun',
  },
];

export const stampRewards: StampReward[] = [
  {
    id: '1',
    restaurant: 'The Cozy Kitchen',
    subtitle: '3 more for a free coffee',
    completed: 7,
    total: 10,
    image: PlaceholderImage,
  },
  {
    id: '2',
    restaurant: 'Sakura Bites',
    subtitle: '6 more for a free roll',
    completed: 4,
    total: 10,
    image: PlaceholderImage,
  },
  {
    id: '3',
    restaurant: 'La Petite Patisserie',
    subtitle: '1 more for a free pastry!',
    completed: 9,
    total: 10,
    image: PlaceholderImage,
  },
  {
    id: '4',
    restaurant: 'The Green Bowl',
    subtitle: '8 more for 50% off',
    completed: 2,
    total: 10,
    image: PlaceholderImage,
  },
];