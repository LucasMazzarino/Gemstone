import { cn } from '@/lib/utils';
import { Order, Product, User } from '@/payload-type'
import Image from 'next/image'

interface props {
  orders: Order[]
}

const ShowOrders = async ({orders} : props) => {

    const [order] = orders

    const items = order.items.map(item => ({
      ...item,
      product: item.product as Product
    }))

    return (
      <div className='font-inter text-md md:text-lg'>
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="bg-gray-50 p-4 mb-4">
            <div className="flex flex-wrap justify-between items-center">
              <h3 className="font-bold truncate">Orden ID: #{order.id}</h3>
              <span
                className={cn('px-2 py-1 rounded-full text-xs font-medium ml-2 mt-2', {
                  'bg-green-100 text-green-600': order._isPaid,
                  'bg-yellow-100 text-yellow-600': !order._isPaid,
                })}
              >
                {order._isPaid ? 'Aprobada' : 'Pendiente'}
              </span>
            </div>
            <ul>
              {items.map(({ product, quantity }) => {
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
                              sizes="(max-width: 100px) 100vw, (max-width: 100px) 50vw, 33vw"
                              src={image.url}
                              alt={`${product.name} image`}
                              className='flex-none rounded-md bg-gray-50 object-cover object-center'
                            />
                          ) : null}
                        </div>   
                    <div className='flex flex-col'>
                      <span className="font-semibold text-lg">{product.name}</span>
                      <span className="text-gray-500">Precio: {product.price}</span>
                      <span className="text-gray-500">Cantidad: {quantity}</span>
                      <span className="text-gray-500">Subtotal: {product.price * quantity!}</span>
                    </div>
                  </li>
                )})}
                 <div className="bg-gray-100 p-4 mt-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Total: ${order.total}</span>
                    <span className="text-gray-500">Creada: {new Date(order.createdAt).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}</span>
                  </div>
                </div>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  

export default ShowOrders