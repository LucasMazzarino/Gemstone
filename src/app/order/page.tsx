import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import ShowOrders from "@/components/ShowOrders"
import { Button, buttonVariants } from "@/components/ui/button"
import { getPayloadClient } from "@/get-payload"
import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from 'next/headers'
import Image from "next/image"
import Link from 'next/link';


const orderPage = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-center my-3 text-xl font-semibold md:text-3xl">Debes iniciar sesión para ver tus ordenes</h2>
        <Image src='https://cdn.gemstonuruguay.com/login-img.png' alt="login" width={1000} height={1000}/> 
        <Link href="/sign-in" className="pb-5">
        <Button variant="secondary">
          Iniciar Sesión
        </Button>
      </Link>
      </div>
    );
  }

  const payload = await getPayloadClient()

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: user.id
      }
    }
  })

  return (
    <MaxWidthWrapper>
      <div className="bg-white">
        <div className="max-w-2xl px-4 pb-24 pt-16 sm:px-2 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Tus ordenes
          </h2>
          {orders.length > 0 ? 
            <ShowOrders orders={orders} /> :
            <div className="flex flex-col items-center justify-center h-full font-semibold">
              <div className="border border-dashed shadow-sm rounded-lg flex-1 flex items-center justify-center p-8 mb-4">
                <div className="flex flex-col items-center gap-4">
                  <Image src="https://cdn.gemstonuruguay.com/empty-cart.png" alt="No orders" width={900} height={900}/>
                  <h3 className="font-bold text-2xl tracking-tight">No hay pedidos aún</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No has realizado ningún pedido aun, visita la tienda
                  </p>
                </div>
              </div>
              <Link href="/product" className={buttonVariants({ size:"lg" })}>Tienda</Link>
           </div>
          }
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default orderPage