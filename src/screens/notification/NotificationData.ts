import DeliveredIcon from '../../assets/icons/ic_delivered.svg';
import DiscountIcon from '../../assets/icons/ic_discount.svg';
import OrderIcon from '../../assets/icons/ic_order.svg';

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  Icon: React.ComponentType<any>;
  isUnread?: boolean;
};

export type NotificationSection = {
  title: string;
  data: NotificationItem[];
};

export const notificationSections: NotificationSection[] = [
  {
    title: 'TODAY',
    data: [
      {
        id: '1',
        title: 'Your order is being prepared',
        description:
          'Sakura Bites has started preparing your order. Estimated delivery in 25 mins.',
        time: '5 min',
        Icon: OrderIcon,
        isUnread: true,
      },
      {
        id: '2',
        title: '20% OFF on Italian Cuisine',
        description:
          'Get up to ₹200 OFF on your next order from selected restaurants.',
        time: '1 hr',
        Icon: DiscountIcon,
        isUnread: true,
      },
    ],
  },
  {
    title: 'THIS WEEK',
    data: [
      {
        id: '3',
        title: 'Order Delivered',
        description:
          'Your order from Cozy Kitchen has been delivered successfully.',
        time: 'Yesterday',
        Icon: DeliveredIcon,
      },
      {
        id: '4',
        title: 'Weekend Offer',
        description:
          'Flat ₹150 OFF on orders above ₹599. Valid till Sunday.',
        time: '2 days ago',
        Icon: DiscountIcon,
      },
    ],
  },
  {
    title: 'OLDER',
    data: [
      {
        id: '5',
        title: 'Order Delivered',
        description:
          'Your order from Burger House was delivered successfully.',
        time: '12 Jun',
        Icon: DeliveredIcon,
      },
      {
        id: '6',
        title: 'Special Discount',
        description:
          'Enjoy exclusive member discounts at nearby restaurants.',
        time: '08 Jun',
        Icon: DiscountIcon,
      },
    ],
  },
];