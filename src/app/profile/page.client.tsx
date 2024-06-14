'use client'

import { User } from '@/payload-type'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import {
  UpdateProfileInfo,
  TUpdateProfileInfo
 } from '@/lib/validators/account-credentials-validator'
import { trpc } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodError } from "zod"
import { toast } from 'sonner'

const ProfilePage = ({ user }: { user: User | null }) => {
  const [isEditing, setIsEditing] = useState(false)

  const OPTIONS = [
    "Artigas",
    "Canelones",
    "Cerro Largo",
    "Colonia",
    "Durazno",
    "Flores",
    "Florida",
    "Lavalleja",
    "Maldonado",
    "Montevideo",
    "Paysandú",
    "Río Negro",
    "Rivera",
    "Rocha",
    "Salto",
    "San José",
    "Soriano",
    "Tacuarembó",
    "Treinta y Tres",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm<TUpdateProfileInfo>({
    resolver: zodResolver(UpdateProfileInfo)
  })

  const {mutate, isLoading}=
  trpc.auth.updateProfile.useMutation({
    onError: (err) => {
      if(err.data?.code === 'BAD_REQUEST'){
        toast.error('Algunos datos son invalidos')
        return
      }
      if(err instanceof ZodError) {
        toast.error(err.issues[0].message)
        return
      }
      toast.error('Algo salio mal')
    },
    onSuccess: () => {
    toast.success('Datos actualizados con éxito')
  }
  })

  const onSubmit = ({
    firstName,
    lastName,
    phoneNumber,
    department,
    address,
  }: TUpdateProfileInfo) => {
    mutate({ firstName, lastName, phoneNumber, department, address})
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="w-full max-w-md mx-auto my-24">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-5 bg-gray-100">
            <h2 className="text-2xl font-bold">Mi Perfil</h2>
          </div>
          <div className="px-6 py-5">
            <p>No se encontró información de usuario. Por favor, inicie sesión.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm mx-auto my-24 sm:max-w-lg">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-5 bg-gray-100">
          <h2 className="text-2xl font-bold">Mi Perfil</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Nombre
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  defaultValue={user.firstName}
                  {...register("firstName")}
                  disabled={!isEditing}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
                {errors?.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Apellido
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  defaultValue={user.lastName}
                  {...register("lastName")}
                  disabled={!isEditing}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
                 {errors?.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                  )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Celular
              </Label>
              <Input
                id="phone"
                type="tel"
                defaultValue={user.phoneNumber}
                {...register("phoneNumber")}
                disabled={!isEditing}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
              {errors?.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="grid gap-1 py-2">
              <Label htmlFor='department'>Departamento</Label>
                <select
                  id='department'
                  {...register("department")}
                  className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none sm:text-sm"
                  defaultValue={user.department}
                  disabled={!isEditing}
                >
                  {OPTIONS.map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
              {errors?.department && (
                <p className="text-sm text-red-500">{errors.department.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Dirección
              </Label>
              <textarea
                id="address"
                rows={2}
                defaultValue={user.address}
                {...register("address")}
                disabled={!isEditing}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
              {errors?.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label className='block text-sm font-medium text-gray-700'>
              Registrado el {new Date(user.createdAt).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
              </Label>
              <Label className='block text-sm font-medium text-gray-700'>
                Tipo de cliente: {user.customerType === 'customer' ? 'Cliente' : 'Cliente mayorista'}
              </Label>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-100 flex justify-end space-x-2">
            {isEditing ? (
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Guardar
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditing ? 'Cancelar' : 'Editar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage