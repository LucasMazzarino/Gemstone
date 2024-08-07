import { getServerSideUser } from '@/lib/payload-utils'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/get-payload'
import { notFound, redirect } from 'next/navigation'
import { Product, User } from '@/payload-type'
import { PRODUCT_CATEGORIES } from '@/config'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import PaymentStatus from '@/components/PaymentStatus'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const ThankYouPage = async ({
  searchParams,
}: PageProps) => {
  const orderId = searchParams.orderId
  const nextCookies = cookies()

  const { user } = await getServerSideUser(nextCookies)
  const payload = await getPayloadClient()

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  })

  const [order] = orders

  if (!order) return notFound()

  const orderUserId =
    typeof order.user === 'string'
      ? order.user
      : order.user.id

  if (orderUserId !== user?.id) {
    return redirect(
      `/sign-in?origin=thank-you?orderId=${order.id}`
    )
  }

  const items = order.items.map(item => ({
    ...item,
    product: item.product as Product
  }))

   const orderTotal = user?.customerType === 'Wholesale' 
    ? items.reduce((total, item) => total + (item.product.wholesalePrice || 0) * (item.quantity || 0), 0)
    : items.reduce((total, item) => total + (item.product.price || 0) * (item.quantity || 0), 0)

  return (
    <main className='relative lg:min-h-full'>
      <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 md:ml-2 lg:pr-4 xl:pr-12'>
        <Image
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          src='/checkout-thank-you.jpg'
          className='h-full w-full object-cover object-center'
          alt='gracias por tu compra'
        />
      </div>

      <div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24'>
          <div className='lg:col-start-2'>
            <p className='text-sm font-medium text-blue-600'>
              Orden creada con éxitos
            </p>
            <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Gracias por tu Orden!
            </h2>
            {order._isPaid ? (
              <p className='mt-2 text-base text-muted-foreground'>
                Su pedido fue procesado y confirmado, los productos
                serán enviados a su dirección y nos pondremos
                en contacto con usted via WhatsApp o Correo {' '}
                {typeof order.user !== 'string' ? (
                  <span className='font-medium text-gray-900'>
                    {order.user.email}
                  </span>
                ) : null}
                .
              </p>
            ) : (
              <p className='mt-2 text-base text-muted-foreground'>
                Apreciamos su pedido y estamos
                tramitándolo actualmente.
                ¡Te enviaremos la confirmación muy pronto!
              </p>
            )}

            <div className='mt-16 text-sm font-medium'>
              <div className='text-muted-foreground'>
                Numero de Orden
              </div>
              <div className='mt-2 text-gray-900'>
                {order.id}
              </div>

              <ul className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
              {items.map(({ product, quantity }) => {
                  const label = PRODUCT_CATEGORIES.find(
                    ({ value }) =>
                      value === product.category
                  )?.label

                  const { image } = product.images[0]

                    return (
                      <li
                        key={product.id}
                        className='flex space-x-6 py-6'>
                        <div className='relative h-24 w-24'>
                          {typeof image !== 'string' &&
                          image.url ? (
                            <Image
                              fill
                              src={image.url}
                              alt={`${product.name} image`}
                              className='flex-none rounded-md bg-gray-100 object-cover object-center'
                            />
                          ) : null}
                        </div>

                        <div className='flex-auto flex flex-col justify-between'>
                          <div className='space-y-1'>
                            <h3 className='text-gray-900'>
                              {product.name}
                            </h3>

                            <p className='my-1'>
                              Categoría: {label}
                            </p>
                          </div>
                        </div>
                        {
                        user?.customerType === 'Wholesale' ? (
                          <div className='flex flex-col text-end'>
                          <span className='flex-none font-medium text-gray-900'>
                            {formatPrice(product.wholesalePrice)}
                          </span>
                          <span className='flex font-medium text-muted-foreground ml-auto pr-2'>
                            cantidad: {quantity}
                          </span>
                          <span className='flex font-medium text-muted-foreground ml-auto pr-2'>
                            subtotal: {product.wholesalePrice * quantity!}
                          </span>
                        </div>
                          )
                          :
                          (
                          <div className='flex flex-col'>
                            <span className='flex-none font-medium text-gray-900'>
                              {formatPrice(product.price)}
                            </span>
                            <p className='flex font-medium text-muted-foreground ml-auto pr-5'>
                              cantidad: {quantity}
                            </p>
                            <span className='flex font-medium text-muted-foreground ml-auto pr-2'>
                              subtotal: {product.price * quantity!}
                            </span>
                          </div>
                          )
                        }
                      </li>
                    )
                  }
                )}
              </ul>

                <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
                  <p className='text-base'>Total</p>
                  <p className='text-base'>
                    {formatPrice(orderTotal)}
                  </p>
                </div>

              <PaymentStatus
                isPaid={order._isPaid}
                orderEmail={(order.user as User).email}
                orderId={order.id}
              />

              <div className='mt-16 border-t border-gray-200 py-6 text-right'>
                <Link
                  href='/product'
                  className='text-sm font-medium text-blue-600 hover:text-blue-500'>
                  Continuar comprando &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ThankYouPage