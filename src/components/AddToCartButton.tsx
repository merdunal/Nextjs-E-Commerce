"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1); // State to manage quantity input

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
      {/* Button for adding to cart */}
      <Button
        onClick={() => {
          console.log(`Product ID: ${product.id}, Quantity: ${quantity}`);
          addItem(product, quantity); // Passing both product and quantity to addItem
          setIsSuccess(true);
        }}
        size="lg"
        className="w-full sm:w-auto flex-1"
      >
        {isSuccess ? "Added to Cart" : "Add to Cart"}
      </Button>

      {/* Input for quantity, adjusts based on screen size */}
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity based on input
        className="w-full sm:w-16 p-2 border rounded mt-2 sm:mt-0"
      />
    </div>
  );
};

export default AddToCartButton;
