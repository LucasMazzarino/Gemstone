import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from 'payload/types'
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
  access: {
    read:  ({ req }) => req.user.role === 'admin',
    create: ({ req }) => req.user.role === 'admin',
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },
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
      name: 'wholesalePrice',
      label: 'Precio Mayorista',
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
      name: 'quantity',
      label: 'Cantidad',
      type: 'number',
      required: false,
      admin: {
        hidden: true,
      }
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