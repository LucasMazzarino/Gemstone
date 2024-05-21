import { NextRequest} from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { getPayloadClient } from "@/get-payload";
import { Resend } from "resend";
import { Product } from '../../payload-type'

import { ReceiptEmailHtml } from "../../components/emails/ReceiptEmail";

const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MERCADO_ACCESS_TOKEN! });
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().then((data) => data as { data: { id: string } });

    if (!body.data || !body.data.id) {
      return Response.json({ success: false, errorMessage: "El id de la solicitud no está definido." });
    }

    let paymentData: any = null; 

    if (!paymentData) {

      const paymentResponse = await new Payment(mercadopago).get({ id: body.data.id });

      if (paymentResponse) {
        paymentData = paymentResponse;
      } else {
        console.error("No se pudo obtener la información del pago");
        return Response.json({ success: false, errorMessage: "No se pudo obtener la información del pago" });
      }
    }

    console.log(paymentData);
    console.log(paymentData.metadata);

    if (!paymentData?.metadata || !paymentData.metadata.user_id || !paymentData.metadata.order_id) {
      console.log("No se encontró metadata");
      return Response.json({ success: false, errorMessage: "No se encontró metadata" });
    }

    if (paymentData.status === 'approved') {
      console.log("Status aprobado");

      const payload = await getPayloadClient();

      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          id: {
            equals: paymentData.metadata.user_id,
          },
        },
      });

      const [user] = users;

      if (!user) {
        console.log("No se encontró el usuario");
        return Response.json({ success: false, errorMessage: "No se encontró el usuario" });
      }

      const { docs: orders } = await payload.find({
        collection: 'orders',
        depth: 2,
        where: {
          id: {
            equals: paymentData.metadata.order_id,
          },
        },
      });

      const [order] = orders;

      if (!order) {
        console.log("No se encontró la orden");
        return Response.json({ success: false, errorMessage: "No se encontró la orden" });
      }

      await payload.update({
        collection: 'orders',
        data: {
          _isPaid: true,
        },
        where: {
          id: {
            equals: paymentData.metadata.order_id,
          },
        },
      });

      const items = order.items.map(item => ({
        ...item,
        product: item.product as Product
      }))

      try {
        const data = await resend.emails.send({
          from: 'GemstoneUruguay <servicio@gemstonuruguay.com>',
          to: [user.email],
          subject:
            'Thanks for your order! This is your receipt.',
          html: ReceiptEmailHtml({
            date: new Date(),
            email: user.email,
            userType: user.customerType!,
            orderId: paymentData.metadata.order_id,
            products: items.map(item => ({
              ...item.product,
              quantity: item.quantity,
            })),
          }),
        });
        return Response.json({ data })
      } catch (error) {
        return Response.json({ success: false, errorMessage: "Error inesperado" });
      }
    
    }
  } catch (error) {
    console.error("Error inesperado:", error);
    return Response.json({ success: false, errorMessage: "Error inesperado" });
  }
  return Response.json({ success: true });
}
