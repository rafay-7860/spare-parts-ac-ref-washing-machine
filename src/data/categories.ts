export type Category = {
  id: string
  number: string
  title: string
  description: string
  image: string
  href: string
}

export const categories: Category[] = [
  {
    id: 'ac',
    number: '01',
    title: 'AIR CONDITIONER SPARE PARTS',
    description:
      'Explore capacitors, motors, control boards, and essential AC components for product enquiries.',
    image:
      'https://images.unsplash.com/photo-1631545806609-5c6ee3d14b9b?auto=format&fit=crop&w=1400&q=80',
    href: '#products',
  },
  {
    id: 'refrigerator',
    number: '02',
    title: 'REFRIGERATOR SPARE PARTS',
    description:
      'Browse cooling components, thermostats, compressors, and refrigerator accessories as sample categories.',
    image:
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1400&q=80',
    href: '#products',
  },
  {
    id: 'washing',
    number: '03',
    title: 'WASHING MACHINE SPARE PARTS',
    description:
      'Discover motors, drain pumps, control boards, and washing machine components for enquiry support.',
    image:
      'https://images.unsplash.com/photo-1626806787461-74be3adc9d9b?auto=format&fit=crop&w=1400&q=80',
    href: '#products',
  },
  {
    id: 'components',
    number: '04',
    title: 'APPLIANCE COMPONENTS',
    description:
      'General appliance components and related parts grouped for easy browsing and direct contact.',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=80',
    href: '#products',
  },
]
