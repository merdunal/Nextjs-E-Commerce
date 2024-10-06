import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { CartItem as CartItemType } from "@/hooks/use-cart"; // Import CartItem type from use-cart
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  item: CartItemType; // Accept the cart item with quantity
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item; // Destructure product and quantity from the cart item
  const { removeItem } = useCart();
  
  const { image } = product.images[0];

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const totalPrice = product.price * quantity; // Calculate total price based on quantity

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image.url ? (
              <Image
                src={image.url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col self-start">
            <span className="line-camp-1 text-sm font-medium mb-1">
              {product.name}
            </span>
            <span className="line-camp-1 text-xs capitalize text-muted-foreground mb-1">
              {label}
            </span>
            <span className="line-camp-1 text-xs capitalize ">
              Miktar: {quantity} {/* Display the correct quantity */}
            </span>
            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => removeItem(product.id)}
                className="flex items-center gap-0.5"
              >
                <X className="w-3 h-3" />
                Kaldır
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(totalPrice)} {/* Show the total price based on quantity */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
