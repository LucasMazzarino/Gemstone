import { useCart } from "@/hooks/use-cart"
import { PRODUCT_CATEGORIES } from "../config"
import { Product } from "@/payload-type"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import CountProduct from "./CountProduct"

interface CartItemProps {
  product: Product
  count: number
  userType: string | null
}

const CartItem = ({ product, count, userType}: CartItemProps) => {

  const {image} = product.images[0]

  const subtotal = userType === 'Wholesale' ?
  product.wholesalePrice * count :
  product.price * count
  
  const {removeItem, changeItemCount} = useCart()
  
  const handleCountChange = (newCount: number) => {
    changeItemCount(product.id, newCount);
  };

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  return (
    <div className="space-y-3 py-3 border-t-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image.url ? (
              <Image 
                src={image.url}
                alt={product.name} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="absolute object-cover"/>
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon 
                  aria-hidden="true" 
                  className="h-4 w-4 text-muted-foreground"/>
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
              <span className="line-clamp-1 text-sm font-medium mb-1">
                {product.name}
              </span>
              <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                {label}
              </span>
              <div className="mt-3 text-xs px-2 py-2 rounded-lg max-w-16 text-black bg-red-500  hover:bg-red-400">
                <button onClick={() => removeItem(product.id)}
                className="flex items-center gap-0.5">
                  <X className="w-3 h-4"/>
                  Quitar
                </button>
              </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          {userType === 'Wholesale' ? (
            <div className="flex flex-col">
              <span className="ml-auto line-clamp-1 text-sm line-through"> 
              {formatPrice(product.price)}
              </span>
              <span className="ml-auto text-sm"> 
              {formatPrice(product.wholesalePrice)}
            </span>
           </div>
          ): (
            <span className="ml-auto line-clamp-1 text-sm"> 
             {formatPrice(product.price)}
            </span>
          )}
          <span className="ml-auto line-clamp-1 text-sm"> 
          Cantidad : 
            <CountProduct 
              count={count} 
              onCountChange={handleCountChange} 
            />
          {/* Cantidad: {count !== undefined ? count.toString() : 'No disponible'} */}
          </span>
          <span className="ml-auto line-clamp-1 text-sm">
          Subtotal : {formatPrice(subtotal)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem