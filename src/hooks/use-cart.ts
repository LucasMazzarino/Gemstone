import { Product } from "@/payload-type"
import { create } from "zustand"
import {createJSONStorage, persist} from "zustand/middleware"

export type CartItem = {
  product: Product
  count: number
}

type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  changeItemCount: ( productId: string, count:number) => void
  isProductInCart: (productId: string) => boolean
}

export const useCart = create<CartState>()(
  persist<CartState>(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          return { items: [...state.items, { product, count: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== id
          ),
        })),
        isProductInCart: (productId: string) =>
        get().items.some((item) => item.product.id === productId),
      clearCart: () => set({ items: [] }),
      changeItemCount: (productId, newCount) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, count: newCount } : item
          ),
        })),    
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)