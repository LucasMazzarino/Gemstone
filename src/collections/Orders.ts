import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({req: {user}}) => {
  if(user.role === "admin") return true

  return {
    user: {
      equals: user?.id
    }
  }
}

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "tus ordenes",
    description: "Suma de todas tus ordenes",
    defaultColumns:['id','_isPaid', 'createdAt'],
    hideAPIURL: true
  },
  access: {
    read: yourOwn,
    update:({req}) => req.user.role === "admin",
    delete:({req}) => req.user.role === "admin",
    create:({req}) => req.user.role === "admin",
  },
  fields:[
    {
      name: "_isPaid",
      label: "Pagado?",
      type: "checkbox", 
      access: {
        read: ({req}) => req.user.role === "admin",
      },
      required: true,
    },
    {
      name: "user",
      label: "usuario",
      type: "relationship",
      relationTo: "users",
      access: {
        read: ({req}) => req.user.role === "admin",
        create: () => false,
        update: () => false, 
      },
      required: true,
    },
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
        },
      ],
      required: true,
    },
    {
      name: 'total',
      label: 'Total',
      type: 'number',
      min: 0,
    }
  ],
}