import { z } from 'zod'
import {
  privateProcedure,
  router,
} from './trpc'
import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../get-payload'
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Resend } from 'resend';
import { OrderEmailHtml } from '../components/emails/OrderEmail';
import { Product } from '@/payload-type';


export const paymentRouter = router({
  createSession: privateProcedure
  .input(z.object({ 
    productsData: z.array(z.object({
      productId: z.string(),
      quantity: z.number()
    }))
  }))
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx;
    const { productsData } = input;

    if (productsData.length === 0) {
      throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    const payload = await getPayloadClient()

    const productIds = productsData.map(data => data.productId);

    const { docs: products } = await payload.find({
      collection: 'products',
      where: {
        id: {
          in: productIds,
        },
      },
    })
    
      let total = 0

      const orderItems = productsData.map(({ productId, quantity }) => {
        const product = products.find(prod => prod.id === productId);
        if (!product) {
          throw new TRPCError({ code: 'NOT_FOUND', message: `Product with id ${productId} not found` });
        }
        
        const unitPrice = user?.customerType === 'Wholesale'
          ? product.wholesalePrice
          : product.price;
  
        const itemTotal = unitPrice * quantity;
        total += itemTotal;

        return{
          product: product.id,
          quantity: quantity,
          price: unitPrice * quantity
        } 
      });

      const order = await payload.create({
        collection: 'orders',
        data: {
          _isPaid: false,
          user: user.id,
          items: orderItems,
          total: total
        },
      })
      
      const lineItems = productsData.map(({ productId, quantity }) => {
        const product = products.find(prod => prod.id === productId);
        if (!product) {
          throw new TRPCError({ code: 'NOT_FOUND', message: `Product with id ${productId} not found` });
        }
  
        const unitPrice = user?.customerType === 'Wholesale'
          ? product.wholesalePrice
          : product.price;
  
        return {
          id: productId,
          title: product.name as string,
          quantity: quantity,
          unit_price: unitPrice,
        };
      });

      const client = new MercadoPagoConfig({accessToken: process.env.MERCADO_ACCESS_TOKEN! });
      
      try{
        const preference = await new Preference(client)
        .create({
          body:{
            items: lineItems,
            notification_url:`https://6704-2800-a4-1a15-bb00-d51a-651c-b571-45e1.ngrok-free.app/payment`,
            back_urls: {
              success:`${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
              failure:`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
              pending:`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
            },
            metadata: {
              userId: user.id,
              orderId: order.id,
            },
          },
        });  
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
  .input(z.object({ 
    productsData: z.array(z.object({
      productId: z.string(),
      quantity: z.number()
    }))
  }))
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx;
    const { productsData } = input;

    if (productsData.length === 0) {
      throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const payload = await getPayloadClient()

    const productIds = productsData.map(data => data.productId);

    const { docs: products } = await payload.find({
      collection: 'products',
      where: {
        id: {
          in: productIds,
        },
      },
    })
    
    let orderTotal = 0

    const orderItems = productsData.map(({ productId, quantity }) => {
      const product = products.find(prod => prod.id === productId);
      if (!product) {
        throw new TRPCError({ code: 'NOT_FOUND', message: `Product with id ${productId} not found` });
      }
      
      const unitPrice = user?.customerType === 'Wholesale'
        ? product.wholesalePrice
        : product.price;

      const itemTotal = unitPrice * quantity;
      orderTotal += itemTotal;

      return {
        product: product.id,
        quantity: quantity,
        price: unitPrice * quantity,
      };
    });

    const order = await payload.create({
      collection: 'orders',
      data: {
        _isPaid: false,
        user: user.id,
        items: orderItems,
        total: orderTotal,
      },
    });

    const items = order.items.map(item => ({
      ...item,
      product: item.product as Product
    }))
    

    const data = await resend.emails.send({
      from: 'GemstoneUruguay <servicio@gemstonuruguay.com>',
      to: [user.email],
      subject:
        'Muchas gracias por tu pedido! esto es lo que ordenaste',
      html: OrderEmailHtml({
        date: new Date(),
        email: user.email,
        userType: user.customerType!,
        orderId: order.id,
        products: items.map(item => ({
          ...item.product,
          quantity: item.quantity,
        })),
      }),
    });
    
    return { url:`${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`}
   
  }
  )
})