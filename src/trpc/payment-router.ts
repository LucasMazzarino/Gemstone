import { z } from 'zod'
import {
  privateProcedure,
  router,
} from './trpc'
import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../get-payload'
import { MercadoPagoConfig, Preference } from 'mercadopago';


export const paymentRouter = router({
  createSession: privateProcedure
  .input(z.object({ productIds:z.array(z.string()), quantity:z.array(z.number())}))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx
      let { productIds, quantity } = input


      if (productIds.length === 0) {
        throw new TRPCError({ code: 'BAD_REQUEST' })
      }


      const payload = await getPayloadClient()

      const { docs: products } = await payload.find({
        collection: 'products',
        where: {
          id: {
            in: productIds,
          },
        },
      })

      const orderItems = products.map((product, index) => {
        const unitPrice = user?.customerType ==='Wholesale'
        ? product.wholesalePrice
        : product.price;

        return{
          product: product.id,
          quantity: quantity[index],
          price: unitPrice * quantity[index],
        } 
      });

      const order = await payload.create({
        collection: 'orders',
        data: {
          _isPaid: false,
          products: products.map((prod) => prod.id),
          user: user.id,
          quantity: orderItems,
        },
      })
      
      const lineItems = products.map((product, index) => {
        const unitPrice = user?.customerType ==='Wholesale'
        ? product.wholesalePrice
        : product.price;

        return {
          id: `product_${index}`,
          title: product.name as string,
          quantity: quantity[index], 
          unit_price: unitPrice 
        };
      });

      const client = new MercadoPagoConfig({accessToken: process.env.MERCADO_ACCESS_TOKEN! });
      
      try{
        const preference = await new Preference(client)
        .create({
          body:{
            items: lineItems,
            notification_url:"https://1fb8-2800-a4-1afa-9200-946b-d310-ea19-543.ngrok-free.app/payment",
            back_urls: {
              success: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
              failure:`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
              pending: "https://www.crunchyroll.com/es-es/watch/G9DUE57Z2/phantoms-of-the-dead",
            },
            metadata: {
              userId: user.id,
              orderId: order.id,
            },
          },
        });  
        console.log(preference.sandbox_init_point?.toString())
        return {url: preference.sandbox_init_point?.toString()}
      } catch(error) {
        return {url: null}
      }

      
    }),
    pollOrderStatus: privateProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input

      const payload = await getPayloadClient()

      const { docs: orders } = await payload.find({
        collection: 'orders',
        where: {
          id: {
            equals: orderId,
          },
        },
      })

      if (!orders.length) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      const [order] = orders

      return { isPaid: order._isPaid }
    }),
  
  cash: privateProcedure
  .input(z.object({ productIds:z.array(z.string()), quantity:z.array(z.number())}))
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx
    let { productIds, quantity } = input

    if (productIds.length === 0) {
      throw new TRPCError({ code: 'BAD_REQUEST' })
    }


    const payload = await getPayloadClient()

    const { docs: products } = await payload.find({
      collection: 'products',
      where: {
        id: {
          in: productIds,
        },
      },
    })

    const orderItems = products.map((product, index) => {
      const unitPrice = user?.customerType ==='Wholesale'
      ? product.wholesalePrice
      : product.price;

      return{
        product: product.id,
        quantity: quantity[index],
        price: unitPrice * quantity[index],
      } 
    });

    const order = await payload.create({
      collection: 'orders',
      data: {
        _isPaid: false,
        products: products.map((prod) => prod.id),
        user: user.id,
        quantity: orderItems,
      },
    })

    return { url:`${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`}
  }
  )
})