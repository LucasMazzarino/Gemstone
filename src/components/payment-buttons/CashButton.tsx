import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc/client';
import { Loader2 } from 'lucide-react';
import { TRPCClientError } from '@trpc/client';
import { toast } from 'sonner';

interface CashButtonProps {
  buttonName: string;
}

const CashButton = ({ buttonName}: CashButtonProps) => {
  const { items, removeItem } = useCart();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(" "|| null);

  const { mutate: createCashOrder, isLoading } = trpc.payment.cash.useMutation({
    onSuccess: (data) => {
      if (data && data.url) {
        router.push(data.url);
      } else {
        setErrorMessage('La respuesta de la sesión de pago no contiene una URL válida.');
      }
    },
    onError: (error) => {
      console.error('Error al crear la sesión de pago:', error);
      
      if (error instanceof TRPCClientError) { 
        const message = error.message || 'Ocurrió un error al crear la sesión de pago.';
        toast.error(message); 

        if (error.data?.cause?.unavailableProductIds) {
          const unavailableProductIds = error.data.cause.unavailableProductIds;
          toast.error(`Algunos productos no están disponibles: ${unavailableProductIds.join(', ')}`);
          unavailableProductIds.forEach((id: string) => removeItem(id));
        }
      } else {
        toast.error('Ocurrió un error inesperado.'); 
      }
    },
  });

  const handleClick = () => {
    const productsData = items.map(({ product, count }) => ({
      productId: product.id,
      quantity: count,
    }));

    createCashOrder({ productsData });
  };

  return (
    <>
      <Button
        disabled={items.length === 0 || isLoading}
        onClick={handleClick}
        className="mt-3 w-full sm:ml-3 sm:w-1/3"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
        ) : null}
        {buttonName}
      </Button>
    </>
  );
};

export default CashButton;