"use client"

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button"
import { useCart } from "../hooks/use-cart"
import { Product } from "../payload-type"

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton = ({ product}: AddToCartButtonProps) => {
  const { addItem, isProductInCart } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("");
 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
      
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  const handleAddToCart = () => {
    if (isProductInCart(product.id)) {
      setErrorMessage("Este producto ya está en el carrito.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    } else {
      addItem(product);
      setIsSuccess(true);
    }
  };

  return (
  <div className="flex space-y-3 space-x-3">
    {/* <CountProduct /> */}
    <Button onClick={handleAddToCart} 
      size="lg" 
      className={`w-full ${errorMessage ? 'bg-red-500 hover:bg-red-500' : ''}`}>
      {errorMessage ? errorMessage : isSuccess ? 
      "Agregado!" : "Agregar al carrito!"}
      </Button>
  </div>
  )
}

export default AddToCartButton