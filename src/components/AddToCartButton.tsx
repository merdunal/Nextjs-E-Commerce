"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";
import { ShoppingCart } from "lucide-react"; // Import the cart icon

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
    <div className="flex items-center justify-center w-full max-w-lg mx-auto">
      {" "}
      {/* Center content horizontally */}
      {/* Centering container with max width and margin */}
      {/* Input for quantity - Smallest square possible */}
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity based on input
        className="w-full h-8 p-1 border rounded text-sm text-center mr-2 md:h-12 md:w-full" // Adjust size for desktop
      />
      {/* Button for adding to cart with icon on mobile */}
      <Button
        onClick={() => {
          console.log(`Product ID: ${product.id}, Quantity: ${quantity}`);
          addItem(product, quantity); // Passing both product and quantity to addItem
          setIsSuccess(true);
        }}
        className="flex items-center justify-center md:justify-center md:items-center h-8 w-8 md:h-12 md:w-full" // Set height and width for the button, same size as input
      >
        {/* Display icon only on mobile */}
        <span className="md:hidden">
          <ShoppingCart size={16} /> {/* Smaller cart icon for mobile */}
        </span>
        {/* Display text only on larger screens */}
        <span className="hidden md:block">
          {isSuccess ? "Eklendi" : "Sepete Ekle"}
        </span>
      </Button>
    </div>
  );
};

export default AddToCartButton;
