
import React from 'react';
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation'
import { trpc } from '@/trpc/client'
import { Loader2} from 'lucide-react'

const MercadoPagoButton = () => {
  const { items } = useCart()
  const router = useRouter()

  const productIds = items.map(({ product }) => product.id)
  const quantity = items.map(({ count }) => count)

  const { mutate: createCashOrder, isLoading } =
  trpc.payment.cash.useMutation({
    onSuccess: (data) => {
      if (data && data.url) {
        router.push(data.url);
      } else {
        console.error('La respuesta de la sesión de pago no contiene una URL válida:', data);
      }
    },
    onError: (error) => {
      console.error('Error al crear la sesión de pago:', error);
    },
  });
  
    return (
        <Button
                disabled={items.length === 0 || isLoading}
                onClick={() =>
                  createCashOrder({ productIds, quantity})
                }
                className='mt-3 w-full sm:ml-3 sm:w-1/3'>
                {isLoading ? (
                  <Loader2 className='w-4 h-4 animate-spin mr-1.5' />
                ) : null}
                Efectivo
              </Button>
    );
};

export default MercadoPagoButton;
        


