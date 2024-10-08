// src/components/OrderSummary.tsx
import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrderSummary = () => {
  const { items } = useCart();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate total price considering the quantity of each product
  const cartTotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity, // Multiply price by quantity
    0
  );

  const fee = 1; // Transaction fee

  return (
    <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Sipariş özeti</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Toplam</p>
          <p className="text-sm font-medium text-gray-900">
            {isMounted ? (
              formatPrice(cartTotal)
            ) : (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>İşlem ücreti</span>
          </div>
          <div className="text-sm font-medium text-gray-900">
            {isMounted ? (
              formatPrice(fee)
            ) : (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Toplam</div>
          <div className="text-base font-medium text-gray-900">
            {isMounted ? (
              formatPrice(cartTotal + fee)
            ) : (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          href="/cart"
          className={buttonVariants({
            variant: "link",
            className: "gap-1.5",
          })}
        >
          <ArrowLeft className="h-4 w-4" />
          Sepete geri dön
        </Link>
      </div>
    </section>
  );
};

export default OrderSummary;
