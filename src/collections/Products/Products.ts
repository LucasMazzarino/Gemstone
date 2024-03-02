import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { Product } from "../../payload-type";
import { BeforeChangeHook } from "payload/dist/collections/config/types";

// const addUser: BeforeChangeHook<Product> = async ({req, data}) => {
//   const user = req.user
//   return {...data, user: user.id}
// }

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name"
  },
  access: {},
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Detalle del producto',
    },
    {
      name: 'price',
      label: 'Precio en UYU',
      min: 0,
      max: 10000,
      type: 'number',
      required: true,
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'select',
      options: PRODUCT_CATEGORIES.map(
        ({ label, value }) => ({ label, value })
      ),
      required: true,
    },
    {
      name: 'product_files',
      label: 'Archivos de producto',
      type: 'relationship',
      required: true,
      relationTo: 'product_files',
      hasMany: false,
    },
    {
      name: 'approvedForSale',
      label: 'Estado del producto',
      type: 'select',
      defaultValue: 'pending',
      access: {
        create: ({ req }) => req.user.role === 'admin',
        read: ({ req }) => req.user.role === 'admin',
        update: ({ req }) => req.user.role === 'admin',
      },
      options: [
        {
          label: 'Verificacion pendiente',
          value: 'pending',
        },
        {
          label: 'Aprovado',
          value: 'approved',
        },
        {
          label: 'De Baja',
          value: 'denied',
        },
      ],
    },
    {
      name: 'priceId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'stripeId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Imagenes del Producto',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}