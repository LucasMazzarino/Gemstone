import AddToCartButton from '@/components/AddToCartButton'
import ImageSlider from '../../../components/ImageSlider'
import MaxWidthWrapper from '../../../components/MaxWidthWrapper'
import ProductsReel from '../../../components/ProductsReel'
import { PRODUCT_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/get-payload'
import { formatPrice } from '@/lib/utils'
import { ShieldCheck, Truck } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import { User } from '@/payload-type'



interface PageProps {
  params: {
    productId: string
    user?: User | null
  }
}

const LINKS = [
  { id: 1, name: 'Inicio', href: '/' },
  { id: 2, name: 'Productos', href: '/product' },
]

const Page = async ({ params }: PageProps) => {

  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)
  const { productId } = params

  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  })

  const [product] = products

  if (!product) return notFound()

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  const validUrls = product.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]
  

  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* Product Details */}
          <div className='lg:max-w-lg lg:self-end'>
            <ol className='flex items-center space-x-2'>
              {LINKS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className='flex items-center text-sm'>
                    <Link
                      href={breadcrumb.href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                      {breadcrumb.name}
                    </Link>
                    {i !== LINKS.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className='mt-4 flex items-center'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                {product.name}
              </h1>
            </div>
            <section className='mt-4'>
              <div className='flex items-center'>
                {user?.customerType === 'Wholesale' ? (
                  <div className="flex flex-col">
                  <p className='font-medium text-gray-900 line-through'>
                    {formatPrice(product.price)}
                  </p>
                  <p className='font-medium text-gray-900'>
                    {formatPrice(product.wholesalePrice)}
                  </p>
                </div>
                ): (
                  <p className='font-medium text-gray-900'>
                  {formatPrice(product.price)}
                </p>
                )}
                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  {label}
                </div>
              </div>

              <div className='mt-4 space-y-6'>
                <p className='text-base text-muted-foreground'>
                  {product.description}
                </p>
              </div>

              <div className='mt-6 flex items-center'>
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
            </section>
          </div>

          {/* Product images */}
          <div className='mt-4 p-4 sm:p-8 sm:pl-0 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
            <div className='aspect-square rounded-lg'>
              <ImageSlider urls={validUrls} />
            </div>
          </div>

          {/* add to cart part */}
          <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
            <div>
              <div className='mt-10'>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductsReel
        user={user}
        href='/product'
        query={{ category: product.category, limit: 4 }}
        title={`Similar ${label}`}
        subtitle={`Aquí tienes ${label} similares a '${product.name}'`}
      />
    </MaxWidthWrapper>
  )
}

export default Page