export const PRODUCT_CATEGORIES = [
  {
    label: 'Anillos',
    value: 'anillos' as const,
    featured: [
      {
        name: 'Editor picks',
        href: `/products?category=anillos`,
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=anillos&sort=desc',
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=anillos',
        imageSrc: '/media/DSC00526.JPG',
      },
    ],
  },
  {
    label: 'Pulseras',
    value: 'pulseras' as const,
    featured: [
      {
        name: 'Favorite Icon Picks',
        href: `/products?category=pulseras`,
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=pulseras&sort=desc',
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'Bestselling Icons',
        href: '/products?category=pulseras',
        imageSrc: '/media/DSC00526.JPG',
      },
    ],
  },
]