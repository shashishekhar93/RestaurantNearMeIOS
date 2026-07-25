export interface OnboardingItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export const ONBOARDING_DATA: OnboardingItem[] = [
  {
    id: '1',
    image:
      'https://empedance.sgp1.digitaloceanspaces.com/expert_house/1784186278975_bg1.png',
    title: 'Discover food around you',
    subtitle:
      'Experience the best local flavours curated just for you.',
  },
  {
    id: '2',
    image:
      'https://empedance.sgp1.digitaloceanspaces.com/espresso_bar/1784186434003_bg2.png',
    title: 'Reserve Your\nTable',
    subtitle:
      'Skip the wait — reserve your spot at the best restaurants nearby, instantly.',
  },
  {
    id: '3',
    image:
      'https://empedance.sgp1.digitaloceanspaces.com/espresso_bar/1784186570512_bg3.png',
    title: 'Real Reviews, Real Recommendations',
    subtitle:
      'See honest ratings from real diners so you always book with confidence.',
  },
];