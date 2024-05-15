import { Package, DollarSign,ShoppingCart } from "lucide-react";
import React from "react";

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
        href: '/product?category=anillos&sort=desc',
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
  {
    label: 'Esclavas',
    value: 'esclavas' as const,
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
  {
    label: 'Caravanas',
    value: 'caravanas' as const,
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
  {
    label: 'Cadenas',
    value: 'cadenas' as const,
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
  {
    label: 'Dijes',
    value: 'dijes' as const,
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
  {
    label: 'Otros',
    value: 'otros' as const,
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

export const ICONS_HOME = [
  {
    name:"Envíos a todo el País",
    Icon: Package,
    description : "Envíos a todo Uruguay"
  },
  {
    name:"Precios mayoristas",
    Icon: ShoppingCart,
    description : "Con la compra de varios artículos opten descuentos"
  },
  {
    name:"Puedes convertirte en Revendedor",
    Icon: DollarSign,
    description : "Si te interesa la venta de joyas contáctenos para obtened mas información "
  },
]


