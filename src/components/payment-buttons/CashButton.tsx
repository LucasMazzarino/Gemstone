import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc/client';
import { Loader2 } from 'lucide-react';

interface CashButtonProps {
  buttonName: string;
}

const CashButton = ({ buttonName }: CashButtonProps) => {
  const { items } = useCart();
  const router = useRouter();

  const { mutate: createCashOrder, isLoading } = trpc.payment.cash.useMutation({
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

  const handleClick = () => {
    const productsData = items.map(({ product, count }) => ({
      productId: product.id,
      quantity: count
    }));

    createCashOrder({ productsData });
  };
  
  return (
    <Button
      disabled={items.length === 0 || isLoading}
      onClick={handleClick}
      className='mt-3 w-full sm:ml-3 sm:w-1/3'
    >
      {isLoading ? (
        <Loader2 className='w-4 h-4 animate-spin mr-1.5' />
      ) : null}
      {buttonName}
    </Button>
  );
};

export default CashButton;