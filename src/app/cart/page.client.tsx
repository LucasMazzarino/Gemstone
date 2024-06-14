'use client'

import MercadoPagoButton from '@/components/payment-buttons/MercadoPagoButton'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import * as Tooltip from '@radix-ui/react-tooltip';
import { Button } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/use-cart'
import { cn, formatPrice } from '@/lib/utils'
import { User } from '@/payload-type'
import { Check, Loader2, X, HelpCircle, Truck, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CashButton from '@/components/payment-buttons/CashButton'


const CartPage = ({ user }: { user: User | null }) => {

  const { items, removeItem } = useCart()

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cartTotal = user?.customerType === 'Wholesale' ?
    items.reduce(
      (total, { product, count }) => total + product.wholesalePrice * count,
      0
    )
    : items.reduce(
      (total, { product, count }) => total + product.price * count,
      0
    );


  return (
    <MaxWidthWrapper >
    <div className="bg-white">
      <div className="mx.auto max-w-2xl px-4 pb-24 pt-16 sm:px-2 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Carrito de Compras
        </h1>
        <div className="mt-12 lg-grid lg:col-12 lg:items-star lg:gap-x-12 xl:gap-x-16">
          <div className={cn("lg:col-span-7", {
            "rounded-lg border-2 border-dashed border-zinc-200 p-12":
              isMounted && items.length === 0,
          })}>
            <h2 className="sr-only">
              Productos en tu carrito
            </h2>
            {isMounted && items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden
                  className="relative mb-4 h-40 w-40 text-muted-foreground">
                  <Image src='https://cdn.gemstonuruguay.com/empty-cart.png'
                    fill
                    sizes='100vw'
                    loading="eager"
                    alt="Carrito vació" />
                </div>
                <h3 className="font-semibold text-2xl">
                  Tu carrito esta vació
                </h3>
                <p className="text-muted-foreground text-center">
                  Nada que mostrar todavía
                </p>
              </div>
            ) : null}
            <ul className={cn({
              "divide-y divide-gray-200 border-b border-t border-gray-200": isMounted && items.length > 0,
            })}>
              {isMounted && items.map(({ product, count }) => {
                const label = PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label

                const { image } = product.images[0]

                return (
                  <li
                    key={product.id}
                    className='flex py-6 sm:py-10'>
                    <div className='flex-shrink-0'>
                      <div className='relative h-24 w-24'>
                        {typeof image !== 'string' &&
                          image.url ? (
                          <Image
                            fill
                            src={image.url}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt='product image'
                            className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'
                          />
                        ) : null}
                      </div>
                    </div>

                    <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                      <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                        <div>
                          <div className='flex justify-between'>
                            <h3 className='text-sm'>
                              <Link
                                href={`/product/${product.id}`}
                                className='font-medium text-gray-700 hover:text-gray-800'>
                                {product.name}
                              </Link>
                            </h3>
                          </div>

                          <div className='mt-1 flex text-sm'>
                            <p className='text-muted-foreground'>
                              Categoría: {label}
                            </p>
                          </div>
                          {
                            user?.customerType === 'Wholesale' ? (
                              <p className='mt-1 text-sm font-medium text-gray-900'>
                                {formatPrice(product.wholesalePrice)}
                              </p>
                              )
                              :
                              (
                                <p className='mt-1 text-sm font-medium text-gray-900'>
                                  {formatPrice(product.price)}
                                </p>
                              )
                          }
                          <p className='mt-1 text-sm font-medium text-muted-foreground'>
                            Cantidad: {count}
                          </p>
                          {
                            user?.customerType === 'Wholesale' ?
                            <p className='mt-6 w-24 text-lg font-medium text-gray-900'>
                            Total : {product.wholesalePrice * count}
                            </p>
                            :
                            <p className='mt-3 w-24 text-lg font-medium text-gray-900'>
                            Total : {product.price * count}
                          </p>                            
                          }
                        </div>

                        <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                          <div className='absolute right-0 top-0'>
                            <Button
                              aria-label='remove product'
                              onClick={() =>
                                removeItem(product.id)
                              }
                              variant='ghost'>
                              <X
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className='mt-3 flex items-center'>
                        <Truck
                          aria-hidden='true'
                          className='h-5 w-5 flex-shrink-0 text-green-700'
                        />
                        <p className='ml-2 text-sm font-semibold text-green-700'>
                          Delivery a todo el Uruguay
                        </p>
                      </div>
                      <div className='mt-6 flex items-center'>
                        <ShieldCheck
                          aria-hidden='true'
                          className='h-5 w-5 flex-shrink-0 text-green-700'
                        />
                        <p className='ml-2 text-sm font-semibold text-green-700'>
                          Pago seguro con Mercado Pago
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>
              Detalles del pedido
            </h2>

            <div className='mt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600'>
                  Subtotal
                </p>
                <p className='text-sm font-medium text-gray-900'>
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Envío</span>
                </div>
                <div className="text-sm font-medium text-gray-900 flex flex-col items-end">
                  {isMounted ? (
                    <div className="flex items-center">
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <div className="flex items-center cursor-pointer">
                              Gratis
                              <HelpCircle className="ml-1" color="blue" size={24} />
                            </div>
                          </Tooltip.Trigger>
                          <Tooltip.Content
                            side="top"
                            align="center"
                            className="bg-gray-900 text-white px-2 py-1 rounded shadow-md"
                          >
                            Unicamente se cobrará el retiro de agencia
                            <Tooltip.Arrow className="fill-gray-900" />
                          </Tooltip.Content>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    </div>
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <div className='text-base font-medium text-gray-900'>
                  Total de la orden
                </div>
                <div className='text-base font-medium text-gray-900'>
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </div>
              </div>
            </div>

            <div className='flex mt-6 justify-start items-center sm:flex-row flex-col gap-x-8'>
              <MercadoPagoButton />
              <CashButton buttonName='Efectivo'/>
              <CashButton buttonName='Deposito'/>
            </div>
          </section>
        </div>
      </div>
    </div>
    </MaxWidthWrapper>
  )
}

export default CartPage