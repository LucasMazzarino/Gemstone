import { Access, CollectionConfig } from 'payload/types'

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === 'admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  access: {
    read: adminsAndUser,
    create: () => true,
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
    defaultColumns: ['id'],
  },
  fields: [
    {
      name: "role",
      defaultValue: "user",     
      required: true,
      admin: {
        condition: () => false, 
      },
      type : "select",
      options: [
        {label:"Admin", value: "admin"},
        {label:"User", value: "user"},
      ],
    },
    {
      name: "firstName",
      label: "Nombre",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "Apellido",
      type: "text",
      required: true,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      required: true,
    },
    {
      name: "department",
      label: "Departamento",
      type: "select",
      hasMany: false,
      options: [
        {
          label: 'Artigas',
          value: 'Artigas',
        },
        {
          label: 'Canelones',
          value: 'Canelones',
        },
        {
          label: 'Cerro Largo',
          value: 'Cerro Largo',
        },
        {
          label: 'Colonia',
          value: 'Colonia',
        },
        {
          label: 'Durazno',
          value: 'Durazno',
        },
        {
          label: 'Flores',
          value: 'Flores',
        },
        {
          label: 'Florida',
          value: 'Florida',
        },
        {
          label: 'Lavalleja',
          value: 'Lavalleja',
        },
        {
          label: 'Maldonado',
          value: 'Maldonado',
        },
        {
          label: 'Montevideo',
          value: 'Montevideo',
        },
        {
          label: 'Paysandú',
          value: 'Paysandú',
        },
        {
          label: 'Río Negro',
          value: 'Río Negro',
        },
        {
          label: 'Rivera',
          value: 'Rivera',
        },
        {
          label: 'Rocha',
          value: 'Rocha',
        },
        {
          label: 'Salto',
          value: 'Salto',
        },
        {
          label: 'San José',
          value: 'San José',
        },
        {
          label: 'Soriano',
          value: 'Soriano',
        },
        {
          label: 'Tacuarembó',
          value: 'Tacuarembó',
        },
        {
          label: 'Treinta y Tres',
          value: 'Treinta y Tres',
        },
      ],
    },
    {
      name: "address",
      label: "Dirección",
      type: "text",
      required: true,
    },
    {
      name: 'customerType',
      label: 'Tipo de cliente',
      type: 'select',
      defaultValue: 'customer',
      access: {
        create: ({ req }) => req.user.role === 'admin',
        update: ({ req }) => req.user.role === 'admin',
      },
      options: [
        {
          label: 'Cliente',
          value: 'customer',
        },
        {
          label: 'Cliente Mayorista',
          value: 'Wholesale',
        },
      ],
    },
  ],
}